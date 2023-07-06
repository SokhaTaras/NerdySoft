import { Component } from '@angular/core';
import { QuestionCategoryEnum } from '../../enums/question-category.enum';
import { Router } from '@angular/router';
import { QuizzesStateService } from '../../services/quizzes-state.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  quizzes$ = this.quizService.quizzes$;
  loading: boolean = true;

  constructor(private quizService: QuizzesStateService) {
    this.statusSwitcher();
  }

  statusSwitcher() {
    this.quizzes$.subscribe((val) => {
      if (val.length) {
        this.loading = false;
      }
    });
  }

  selectQuizz(name?: QuestionCategoryEnum) {
    this.quizService.startQuiz(name);
  }
}
