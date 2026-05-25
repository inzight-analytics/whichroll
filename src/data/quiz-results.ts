export type QuizResponse = {
  label: string;
  percent: string;
  /** Highlights orange bar; otherwise highest percent is used */
  isCorrect?: boolean;
};

export type QuizQuestion = {
  questionTitle: string;
  responses: QuizResponse[];
  caption?: string;
};

export type QuizChartData = {
  /** First three quiz questions — one chart each */
  standalone: QuizQuestion[];
  /** Last two questions — shared group title and optional caption */
  grouped: Array<{
    groupTitle: string;
    questions: QuizQuestion[];
    caption?: string;
  }>;
};

/** Replace with real survey data when ready */
export const quizChartData: QuizChartData = {
  standalone: [
    {
      questionTitle: 'How many Māori electorates are there right now?',
      responses: [
        { label: '4 electorates', percent: '9.0' },
        { label: '5 electorates', percent: '9.9' },
        { label: '6 electorates', percent: '13.6' },
        { label: '7 electorates', percent: '43.7', isCorrect: true },
        { label: 'Don\'t know', percent: '23.8' },
      ],
    },
    {
      questionTitle: 'James knows he has Māori whakapapa but he doesn\'t know which Iwi he is from. Can James enrol on the Māori roll?',
      responses: [
        { label: 'Yes', percent: '89.4', isCorrect: true },
        { label: 'No', percent: '3.8' },
        { label: 'Don\t know', percent: '6.8' },
      ],
    },
    {
      questionTitle: 'True/False: Voters on the Māori roll have the same options for their party vote as voters on the General roll.',
      responses: [
        { label: 'True', percent: '63.5', isCorrect: true },
        { label: 'False', percent: '28.8' },
        { label: 'Don\'t know', percent: '7.7' },
      ],
    },
  ],
  grouped: [
    {
      groupTitle: 'There were two important questions that show where people lack information: ',
      questions: [
        {
          questionTitle: 'True/False: You can change from the General Roll to the Māori Roll at any time.',
          responses: [
            { label: 'True', percent: '39.7' },
            { label: 'False', percent: '56.8', isCorrect: true },
            { label: 'Don\'t know', percent: '3.5' },
          ],
          caption: 'Almost 40% who did the quiz thought we could change rolls at any time. The good news for them is that this has changed – from 31st March you will be able to change rolls any time, except the 3 months before a General or Local Election or before a by-election in your area.',
        }, {
          questionTitle: 'If more Māori leave the General roll and choose the Māori roll, what happens to the number of Māori electorates?',
          responses: [
            { label: 'Increases', percent: '44.8', isCorrect: true },
            { label: 'Stays the same', percent: '32.3' },
            { label: 'Decreases', percent: '10.1' },
            { label: 'Don\'t know', percent: '12.7' },
          ],
          caption: "A minority of Māori know that the number of Māori electorates increases if more Māori join the Māori roll. This is still true, and the new law means that the number of Māori electorates will be determined based on enrolment numbers at 1st April."
        },
      ]
    },
  ],
};
