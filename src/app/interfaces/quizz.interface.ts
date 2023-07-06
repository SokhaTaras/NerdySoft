import { QuestionCategoryEnum } from '../enums/question-category.enum';
import { IQuestion } from './question.interface';

export interface IQuizz {
  name: QuestionCategoryEnum;
  questions: IQuestion[];
}
