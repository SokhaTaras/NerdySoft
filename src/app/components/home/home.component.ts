import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzesStateService } from '../../services/quizzes-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quizzes$ = this.quizService.quizzes$;

  constructor(
    private router: Router,
    private quizService: QuizzesStateService
  ) {}
}
