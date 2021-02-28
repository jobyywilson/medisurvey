import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { QuestionListComponent } from './question-list/question-list.component';
import { DemoMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionListComponent,
    LoginComponent,
    QuestionPreviewComponent,
    AlertDialogComponent,
    ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
