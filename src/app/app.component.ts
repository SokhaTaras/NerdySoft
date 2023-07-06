import { Component, OnInit } from '@angular/core';
import { QuizzesStateService } from './services/quizzes-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NerdySoft';

  constructor(private quizService: QuizzesStateService) {}

  async ngOnInit() {
    await this.quizService.initQuizzes();
  }
}
