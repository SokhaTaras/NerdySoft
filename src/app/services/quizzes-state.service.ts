import { Injectable } from '@angular/core';
import { TriviaApiService } from './trivia-api.service';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { getMultipleRandomElementsFromArray } from '../utils/helpers';
import { IQuizz } from '../interfaces/quizz.interface';
import { Category } from '../interfaces/category.interface';
import { IGetQuestionsResponse } from '../interfaces/get-questions-response.interface';

const DEFAULT_QUESTIONS_AMOUNT = 10;
const DEFAULT_QUIZZES_AMOUNT = 10;

@Injectable({
  providedIn: 'root',
})
export class QuizzesStateService {
  public quizzes$ = new BehaviorSubject<IQuizz[]>([]);

  constructor(private triviaApiService: TriviaApiService) {}

  async initQuizzes() {
    await this.triviaApiService
      .getCategories()
      .pipe(
        switchMap((response) =>
          forkJoin(
            this.getQuestionsPerCategoryRequests(response.trivia_categories)
          ).pipe(
            map((responses) => {
              return responses.map((questionsPerCategory) => ({
                name: questionsPerCategory.results[0].category,
                questions: questionsPerCategory.results,
              }));
            })
          )
        )
      )
      .subscribe((quizzes) => {
        this.quizzes$.next(quizzes);
      });
  }

  private getQuestionsPerCategoryRequests(
    categories: Category[]
  ): Observable<IGetQuestionsResponse>[] {
    const randomCategories = getMultipleRandomElementsFromArray(
      categories,
      DEFAULT_QUIZZES_AMOUNT
    );
    return randomCategories.map((category) =>
      this.triviaApiService.getQuestions(DEFAULT_QUESTIONS_AMOUNT, category.id)
    );
  }
}
