import { QuestionCategoryEnum } from "../enums/question-category.enum";
import { QuestionResult } from "./question.interface";

export interface IQuizz {
  name: QuestionCategoryEnum;
  questions: QuestionResult[]
}
