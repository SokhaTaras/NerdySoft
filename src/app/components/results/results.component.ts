import { Component } from '@angular/core';
import { QuizzesStateService } from '../../services/quizzes-state.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  currentResultsStats$ = this.quizService.getCurrentQuizzStats();

  constructor(private quizService: QuizzesStateService) {}
}
