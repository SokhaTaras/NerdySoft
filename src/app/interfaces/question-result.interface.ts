import { IQuestion } from './question.interface';

export interface IQuestionResult extends IQuestion {
  answer: string;
  timeSpent: number;
}
