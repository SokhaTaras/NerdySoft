import { Component } from '@angular/core';
import { IQuizz } from '../../interfaces/quizz.interface';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent {
  quizes: IQuizz[] = [];
}
