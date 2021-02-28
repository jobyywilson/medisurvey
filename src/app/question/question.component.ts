import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/model/question';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { QuestionServiceService } from '../service/question-service.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { Constants } from '../shared/constant';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  isEditAllowed: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private questionServiceService: QuestionServiceService,
    private router: Router, public fb: FormBuilder, private dialog: MatDialog,
    private authenticationServiceService: AuthenticationServiceService) {
    this.loadData();
    this.isEditAllowed = !this.disableEdit.includes(this.model.accessRights) || authenticationServiceService.isAdmin;
    this.questionForm = this.fb.group({
      questionNameControl: [{ value: this.model.name, disabled: !this.isEditAllowed }, [Validators.required]],
      questionTypeControl: [{ value: this.model.questionType, disabled: !this.isEditAllowed }, [Validators.required]],
      questionRightsControl: [{ value: this.model.accessRights, disabled: !this.isEditAllowed }, [Validators.required]],
    });

  }
  disableEdit = ['Read access', 'No access']
  subQuestionAllowedFor = ['Radio Button', 'Check Box']
  fieldType = ['Text Box', 'Radio Button', 'Check Box', 'Slider'];
  accessRights = ['Read access', 'Write access', 'No access']
  model: Question = new Question(0, "", "", "", []);
  values = [] as any;

  confirm(event: any) {
    let index = this.values.indexOf(event.data);
    this.values.splice(index, 1);

    event.confirm.resolve();
  }

  removevalue(i: any) {
    this.values.splice(i, 1);
  }

  addvalue() {
    this.values.push({ name: "" });
  }
  ngOnInit(): void {
  }
  updateFormControlToModel(): Question {
    let nameControl = this.questionForm.get('questionNameControl');

    this.model.name = nameControl != undefined ? nameControl.value : "";
    this.model.data = this.values;
    return this.model;
  }
  get isSubQuestionValid(): boolean {
    if (this.values.length == 0 && this.subQuestionAllowedFor.includes(this.model.questionType)) {
      return false;
    }

    return !this.values.some((el: any) => el['name'].length == 0);
  }
  submit() {
    if (!this.questionForm.valid || !this.isSubQuestionValid) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          message: Constants.MIS_MNDRY_FLD,
          buttonText: {
            cancel: Constants.OKAY
          }
        },
      });
    } else {
      this.updateFormControlToModel();
      this.questionServiceService.saveQuestion(this.model)
      this.back();
    }


  }
  back() {
    this.router.navigateByUrl("/questions");
  }
  loadData() {
    this.activatedRoute.paramMap.subscribe(params => {
      let data = this.questionServiceService.getQuestionsById(params.get('id'));
      if (data) {
        this.model = data;
      } else {
        this.back();
      }

      this.values = this.model.data;

    });

  }
  changeQuestionType(event: any) {

    this.model.questionType = event.target.value.split(":")[1].trim();
    this.values = [];
  }

  changeAccessRights(event: any) {

    this.model.accessRights = event.target.value.split(":")[1].trim();
  }
  previewQuestions(): void {
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      height: '40%',
      width: '60%',
      data: [this.updateFormControlToModel()]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  get name() { return this.questionForm.get('questionNameControl'); }
  get questionType() { return this.questionForm.get('questionTypeControl'); }
  get questionRights() { return this.questionForm.get('questionRightsControl'); }
}
