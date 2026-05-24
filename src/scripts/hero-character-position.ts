const LAYOUT_MAX = 1410;
const CHEVRON_H_VW = 12;
const CHEVRON_SLOPE = 0.947;
const CHAR_INSET_RATIO = 0.04;
const CHAR_WIDTH_RATIO = 0.22;
const CHAR_WIDTH_LEFT_MAX = 340;
const CHAR_WIDTH_RIGHT_MAX = 360;
const CHAR_OVERLAP_VW = 0.5;

function chevronBottomAt(panelX: number, panelHalf: number, chevronH: number): number {
  const ratio = Math.min(Math.max(panelX / panelHalf, 0), 1);
  return chevronH * (1 - ratio * CHEVRON_SLOPE);
}

function panelXForInnerEdge(innerEdgeX: number, panelHalf: number): number {
  return innerEdgeX <= panelHalf ? innerEdgeX : innerEdgeX - panelHalf;
}

function layoutGeometry(width: number) {
  const inset = Math.max(16, width * CHAR_INSET_RATIO);
  const widthLeft = Math.min(width * CHAR_WIDTH_RATIO, CHAR_WIDTH_LEFT_MAX);
  const widthRight = Math.min(width * CHAR_WIDTH_RATIO, CHAR_WIDTH_RIGHT_MAX);
  const half = width / 2;

  return {
    inset,
    widthLeft,
    widthRight,
    half,
    panelXLeft: inset + widthLeft,
    panelXRight: half - inset - widthRight,
    chevronH: CHEVRON_H_VW * (width / 100),
    overlap: CHAR_OVERLAP_VW * (width / 100),
  };
}

export function positionHeroCharacters(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  const leftChar = hero?.querySelector<HTMLElement>('.hero-character--left');
  const rightChar = hero?.querySelector<HTMLElement>('.hero-character--right');
  if (!hero || !leftChar || !rightChar) return;

  const viewportW = window.innerWidth;
  const panelHalf = viewportW / 2;

  let panelXLeft: number;
  let panelXRight: number;
  let slantPanelHalf: number;
  let chevronH: number;
  let overlap: number;

  if (viewportW > LAYOUT_MAX) {
    // Past layout max: freeze vertical position to 1410px geometry
    const layout = layoutGeometry(LAYOUT_MAX);
    panelXLeft = layout.panelXLeft;
    panelXRight = layout.panelXRight;
    slantPanelHalf = layout.half;
    chevronH = layout.chevronH;
    overlap = layout.overlap;
  } else {
    const layout = layoutGeometry(viewportW);
    const leftRect = leftChar.getBoundingClientRect();
    const rightRect = rightChar.getBoundingClientRect();

    panelXLeft = panelXForInnerEdge(leftRect.right, panelHalf);
    panelXRight = panelXForInnerEdge(rightRect.left, panelHalf);
    slantPanelHalf = layout.half;
    chevronH = layout.chevronH;
    overlap = layout.overlap;
  }

  const bottomLeft = chevronBottomAt(panelXLeft, slantPanelHalf, chevronH) - overlap;
  const bottomRight = chevronBottomAt(panelXRight, slantPanelHalf, chevronH) - overlap;

  hero.style.setProperty('--char-bottom-left', `${bottomLeft}px`);
  hero.style.setProperty('--char-bottom-right', `${bottomRight}px`);
}

export function initHeroCharacterPosition(): void {
  const run = () => requestAnimationFrame(positionHeroCharacters);

  run();

  window.addEventListener('resize', run, { passive: true });

  document.querySelectorAll<HTMLImageElement>('.hero-character').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', run, { once: true });
  });
}
