import { IQuestion } from './question.interface';

export interface IGetQuestionsResponse {
  response_code: number;
  results: IQuestion[];
}
