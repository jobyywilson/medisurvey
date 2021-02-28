import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question/question.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'questions/:id', component: QuestionComponent ,canActivate: [AuthGuard]},
  { path: 'questions', component: QuestionListComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
