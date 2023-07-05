import { Component, OnInit } from '@angular/core';
import { QuizzesStateService } from './services/quizzes-state.service';
import { Observable } from 'rxjs';
import { IQuizz } from './interfaces/quizz.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NerdySoft';
  quizzes$: Observable<IQuizz[]> = this.quizService.quizzes$;

  constructor(private quizService: QuizzesStateService) {}

  async ngOnInit() {
    await this.quizService.initQuizzes();
  }
}
