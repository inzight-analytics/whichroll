import type { QuizChartData, QuizQuestion, QuizResponse } from '../data/quiz-results';

const Y_TICKS = [100, 75, 50, 25, 0] as const;

function parsePercent(value: string): number {
  const n = parseFloat(value.replace(/%/g, '').trim());
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}

function highlightIndex(responses: QuizResponse[]): number {
  const correct = responses.findIndex((r) => r.isCorrect);
  if (correct >= 0) return correct;

  let best = 0;
  let bestVal = -1;
  responses.forEach((r, i) => {
    const v = parsePercent(r.percent);
    if (v > bestVal) {
      bestVal = v;
      best = i;
    }
  });
  return best;
}

function createChart(question: QuizQuestion): HTMLElement {
  const topIdx = highlightIndex(question.responses);
  const chart = document.createElement('figure');
  chart.className = 'quiz-chart';

  const title = document.createElement('figcaption');
  title.className = 'quiz-chart__title';
  title.textContent = question.questionTitle;
  chart.append(title);

  const body = document.createElement('div');
  body.className = 'quiz-chart__body';

  const plot = document.createElement('div');
  plot.className = 'quiz-chart__plot';

  const yLabel = document.createElement('p');
  yLabel.className = 'quiz-chart__y-label';
  yLabel.textContent = '% who answered';

  const yAxis = document.createElement('div');
  yAxis.className = 'quiz-chart__y-axis';
  yAxis.setAttribute('aria-hidden', 'true');
  Y_TICKS.forEach((tick) => {
    const tickEl = document.createElement('span');
    tickEl.className = 'quiz-chart__y-tick';
    tickEl.dataset.tick = String(tick);
    tickEl.style.top = `${100 - tick}%`;
    tickEl.textContent = `${tick}%`;
    yAxis.append(tickEl);
  });

  const chartArea = document.createElement('div');
  chartArea.className = 'quiz-chart__chart-area';

  const grid = document.createElement('div');
  grid.className = 'quiz-chart__grid';
  grid.setAttribute('aria-hidden', 'true');
  Y_TICKS.forEach((tick) => {
    const line = document.createElement('div');
    line.className = 'quiz-chart__grid-line';
    line.dataset.tick = String(tick);
    line.style.bottom = `${tick}%`;
    grid.append(line);
  });

  const bars = document.createElement('div');
  bars.className = 'quiz-chart__bars';
  bars.setAttribute('role', 'list');

  const xLabels = document.createElement('div');
  xLabels.className = 'quiz-chart__x-labels';
  xLabels.setAttribute('aria-hidden', 'true');

  question.responses.forEach((response, index) => {
    const pct = parsePercent(response.percent);
    const column = document.createElement('div');
    column.className = 'quiz-chart__column';
    column.setAttribute('role', 'listitem');

    const track = document.createElement('div');
    track.className = 'quiz-chart__track';
    track.setAttribute('aria-hidden', 'true');

    const value = document.createElement('span');
    value.className = 'quiz-chart__value';
    value.style.setProperty('--bar-pct', String(pct));
    value.textContent = response.percent.includes('%') ? response.percent : `${response.percent}%`;

    const bar = document.createElement('div');
    bar.className =
      index === topIdx ? 'quiz-chart__bar quiz-chart__bar--top' : 'quiz-chart__bar';
    bar.style.height = `${pct}%`;

    track.append(bar, value);
    column.append(track);
    bars.append(column);

    const label = document.createElement('span');
    label.className = 'quiz-chart__label';
    label.textContent = response.label;
    xLabels.append(label);
  });

  chartArea.append(grid, bars);
  plot.append(yLabel, yAxis, chartArea, xLabels);
  body.append(plot);
  chart.append(body);

  if (question.caption) {
    const caption = document.createElement('p');
    caption.className = 'quiz-chart__caption';
    caption.textContent = question.caption;
    chart.append(caption);
  }

  return chart;
}

export function initQuizBarCharts(root: HTMLElement, data: QuizChartData): void {
  root.replaceChildren();

  const standaloneGrid = document.createElement('div');
  standaloneGrid.className = 'quiz-charts-grid quiz-charts-grid--standalone';
  data.standalone.forEach((q) => standaloneGrid.append(createChart(q)));
  root.append(standaloneGrid);

  data.grouped.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'quiz-chart-group';

    const heading = document.createElement('h3');
    heading.className = 'quiz-chart-group__title';
    heading.textContent = group.groupTitle;
    section.append(heading);

    const grid = document.createElement('div');
    grid.className = 'quiz-charts-grid quiz-charts-grid--grouped';
    group.questions.forEach((q) => grid.append(createChart(q)));
    section.append(grid);

    if (group.caption) {
      const caption = document.createElement('p');
      caption.className = 'quiz-chart-group__caption';
      caption.textContent = group.caption;
      section.append(caption);
    }

    root.append(section);
  });
}
