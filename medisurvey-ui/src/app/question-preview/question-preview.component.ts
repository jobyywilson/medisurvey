import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/model/question';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public questionList: Question[]) { }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
