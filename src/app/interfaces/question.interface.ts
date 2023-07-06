import { QuestionCategoryEnum } from '../enums/question-category.enum';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { QuestionDifficultyEnum } from '../enums/question-difficulty.enum';

export interface IQuestion {
  category: QuestionCategoryEnum;
  type: QuestionTypeEnum;
  difficulty: QuestionDifficultyEnum;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
