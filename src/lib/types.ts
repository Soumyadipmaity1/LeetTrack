export interface ResponseDataWithTitle {
  link: string;
  questionId: string;
  questionFrontendId: string;
  questionTitle: string;
  titleSlug: string;
  difficulty: string;
  isPaidOnly: boolean;
  question: string;
  exampleTestcases: string;
  topicTags: TopicTag[];
  hints: any[];
  solution: Solution;
  companyTagStats: any;
  likes: number;
  dislikes: number;
  similarQuestions: string;
}

interface TopicTag {
  name: string;
  slug: string;
  translatedName: any;
}

interface Solution {
  id: string;
  canSeeDetail: boolean;
  paidOnly: boolean;
  hasVideoSolution: boolean;
  paidOnlyVideo: boolean;
}

export interface ResponseDataWithTags {
  totalQuestions: number;
  count: number;
  problemsetQuestionList: ProblemsetQuestionList[];
}

interface ProblemsetQuestionList {
  acRate: number;
  difficulty: string;
  freqBar: any;
  questionFrontendId: string;
  isFavor: boolean;
  isPaidOnly: boolean;
  status: any;
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}

export interface QuestionOfTheDay {
  questionLink: string;
  date: string;
  questionId: string;
  questionFrontendId: string;
  questionTitle: string;
  titleSlug: string;
  difficulty: string;
  isPaidOnly: boolean;
  question: string;
  exampleTestcases: string;
  topicTags: TopicTag[];
  hints: any[];
  solution: Solution;
  companyTagStats: any;
  likes: number;
  dislikes: number;
  similarQuestions: string;
}
