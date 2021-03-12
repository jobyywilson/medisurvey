import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question/question.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'questions/:layout/:id', component: QuestionComponent },
  { path: 'questions/:layout', component: QuestionListComponent},
  { path: '', component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
