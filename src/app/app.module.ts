import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleComponent } from './components/title/title.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayComponent,
    ResultsComponent,
    HomeComponent,
    NotFoundComponent,
    TitleComponent,
    QuizCardComponent,
    QuizListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
