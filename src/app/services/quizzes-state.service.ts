import { Injectable } from '@angular/core';
import { TriviaApiService } from './trivia-api.service';
import {
  BehaviorSubject,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { getMultipleRandomElementsFromArray } from '../utils/helpers';
import { IQuizz } from '../interfaces/quizz.interface';
import { Category } from '../interfaces/category.interface';
import { IGetQuestionsResponse } from '../interfaces/get-questions-response.interface';
import { IQuestion } from '../interfaces/question.interface';
import { IStats } from '../interfaces/stats.interface';
import { QuestionCategoryEnum } from '../enums/question-category.enum';
import { Router } from '@angular/router';
import { IQuestionResult } from '../interfaces/question-result.interface';

const DEFAULT_QUESTIONS_AMOUNT = 10;
const DEFAULT_QUIZZES_AMOUNT = 10;

@Injectable({
  providedIn: 'root',
})
export class QuizzesStateService {
  public quizzes$ = new BehaviorSubject<IQuizz[]>([]);
  public currentQuizz$ = new BehaviorSubject<IQuizz | null>(null);
  public questionsResults$ = new BehaviorSubject<IQuestionResult[]>([]);

  constructor(
    private triviaApiService: TriviaApiService,
    private router: Router
  ) {}

  async initQuizzes() {
    await this.triviaApiService
      .getCategories()
      .pipe(
        switchMap((response) =>
          forkJoin(
            this.getQuestionsPerCategoryRequests(response.trivia_categories)
          ).pipe(
            map((responses) => {
              return responses
                .map((questionsPerCategory) => ({
                  name: questionsPerCategory.results[0]?.category,
                  questions: questionsPerCategory.results,
                }))
                .filter((value) => value.questions.length);
            })
          )
        )
      )
      .subscribe((quizzes) => {
        this.quizzes$.next(quizzes);
      });
  }

  getCurrentQuizzStats() {
    return from(this.questionsResults$).pipe(
      map((value) => {
        return this.calculateStatsForResults(value);
      })
    );
  }

  calculateStatsForResults(results: IQuestionResult[]): IStats {
    let points = 0;
    let pointsMax = results.length || 0;
    let quizzTime = 0;
    let timeForSuccess = 0;
    let timeForWrong = 0;

    results.forEach((result) => {
      if (result.answer === result.correct_answer) {
        points++;
        timeForSuccess += result.timeSpent;
      } else {
        timeForWrong += result.timeSpent;
      }

      quizzTime += result.timeSpent;
    });

    return {
      points,
      pointsMax,
      averageTime: quizzTime / pointsMax || 0,
      averageTimeForSuccess: timeForSuccess / points || 0,
      averageTimeForWrong: timeForWrong / (pointsMax - points) || 0,
      quizzTime,
    };
  }

  selectQuizz(name?: QuestionCategoryEnum) {
    const quizzes = this.quizzes$.getValue();

    if (name) {
      this.currentQuizz$.next(
        quizzes.find(({ name: quizzName }) => quizzName === name) as IQuizz
      );
    } else {
      const [randomQuizz] = getMultipleRandomElementsFromArray(quizzes, 1);
      this.currentQuizz$.next(randomQuizz);
    }
  }

  goToPlayPage() {
    this.router.navigate(['play']);
  }

  startQuiz(name?: QuestionCategoryEnum) {
    this.selectQuizz(name);
    this.goToPlayPage();
  }

  refreshCurrentQuizz() {
    this.currentQuizz$.next(null);
  }

  refreshQuestionResults() {
    this.questionsResults$.next([]);
  }

  addQuestionResult(question: IQuestion, answer: string, timeSpent: number) {
    this.questionsResults$.next(
      this.questionsResults$
        .getValue()
        .concat([{ ...question, answer, timeSpent }])
    );
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
