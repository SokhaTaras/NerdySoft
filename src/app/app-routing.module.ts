import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {ResultsComponent} from "./components/results/results.component";
import {PlayComponent} from "./components/play/play.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children:[
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'results',
      component: ResultsComponent,
    },
    {
      path: 'play',
      component: PlayComponent
    }
  ]
},
  {
    path:'**',
    component: NotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
