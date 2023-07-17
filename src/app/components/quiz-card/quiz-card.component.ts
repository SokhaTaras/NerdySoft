import { Component, Input } from '@angular/core';
import { QuizzesStateService } from '../../services/quizzes-state.service';
import { IQuizz } from '../../interfaces/quizz.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent {
  @Input() quiz: IQuizz | undefined;
  constructor(private quizService: QuizzesStateService) {}

  selectQuiz() {
    this.quizService.startQuiz(this.quiz?.name);
  }
}
