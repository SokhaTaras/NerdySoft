import { QuestionResult } from "./question.interface";

export interface IGetQuestionsResponse {
  response_code: number;
  results: QuestionResult[]
}
