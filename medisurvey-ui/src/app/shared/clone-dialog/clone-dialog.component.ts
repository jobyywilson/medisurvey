import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionLayot } from 'src/model/questionlayout';

@Component({
  selector: 'app-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.scss']
})
export class CloneDialogComponent {

  cloneForm: FormGroup;
  layout: QuestionLayot | undefined ;
  oldLayoutName : string ="";
  confirmButtonText = "Clone"
  cancelButtonText = "Cancel"
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CloneDialogComponent>) {
      this.cloneForm = this.formBuilder.group({
        oldLayoutName:[{value:this.oldLayoutName, disabled: true}],
        newLayoutName: ['', Validators.required]
      });
    if (data) {
      this.layout = data;
      this.oldLayoutName = data.setName;
      this.cloneForm.controls['oldLayoutName'].setValue(this.oldLayoutName);
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.newLayoutName?.value);
  }

  get newLayoutName() { return this.cloneForm.get('newLayoutName'); }
}
