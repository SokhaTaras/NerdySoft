import { Component } from '@angular/core';
import { QuizzesStateService } from '../../services/quizzes-state.service';
import { IQuestion } from '../../interfaces/question.interface';
import { IQuizz } from '../../interfaces/quizz.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  currentQuizz: IQuizz | null | undefined;
  currentQuestion$ = new BehaviorSubject<IQuestion | null>(null);
  currentPosition = 0;

  constructor(
    private router: Router,
    private quizService: QuizzesStateService,
    private sanitizer: DomSanitizer
  ) {
    this.quizService.currentQuizz$.subscribe((quizz) => {
      if (quizz) {
        this.currentQuizz = quizz;
        this.currentQuestion$.next(quizz.questions[0]);
      }
    });
  }

  getSanitizedString(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  addQuestionResult(question: IQuestion, answer: string) {
    this.quizService.addQuestionResult(question, answer, 20);
    this.currentPosition += 1;
    const maxPosition = this.currentQuizz?.questions?.length as number;

    if (this.currentPosition < maxPosition) {
      this.currentQuestion$.next(
        this.currentQuizz?.questions[this.currentPosition] as IQuestion
      );
    } else {
      this.goToResultsPage();
    }
  }

  goToResultsPage() {
    this.router.navigate(['results']);
  }
}
