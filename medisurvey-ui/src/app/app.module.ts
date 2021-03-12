import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionListComponent } from './question-list/question-list.component';
import { DemoMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { CloneDialogComponent } from './shared/clone-dialog/clone-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionListComponent,
    LoginComponent,
    QuestionPreviewComponent,
    AlertDialogComponent,
    ConfirmationDialog,
    SidemenuComponent,
    CloneDialogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
