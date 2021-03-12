import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/model/question';
import { User } from 'src/model/user';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { CommonService } from '../service/common.service';
import { QuestionServiceService } from '../service/question-service.service';
import { UserService } from '../service/user.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { Constants } from '../shared/constant';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  questionForm: FormGroup | null = null;
  modifyAllowed: boolean = true;
  currentLayoutName: string = "";
  constructor(private activatedRoute: ActivatedRoute, private questionServiceService: QuestionServiceService,
    private router: Router, public fb: FormBuilder, private dialog: MatDialog,private commonService:CommonService,
    private userService: UserService) {
    this.loadData();


  }
  subQuestionAllowedFor = ['Radio Button', 'Check Box']
  fieldType = ['Text Box', 'Radio Button', 'Check Box', 'Slider'];
  model: Question = new Question("", "", "", this.currentLayoutName, []);
  values = [] as any;

  confirm(event: any) {
    let index = this.values.indexOf(event.data);
    this.values.splice(index, 1);

    event.confirm.resolve();
  }

  checkEditAllowed() {
    let role = this.userService.currentUserInfo.role;
    if (this.currentLayoutName == Constants.DEFAULT_LAYOUT_NAME && role != Constants.ADMIN) {
      return false;
    }
    return true;
  }

  removevalue(i: any) {
    this.values.splice(i, 1);
  }

  addvalue() {
    this.values.push({ name: "" });
  }
  loadPrevilages(user: User) {
    if (user) {
      this.extractPrevilages(user);
    } else {
      this.userService.fetchCurrentUserInfo().subscribe((user: User) => {
        this.extractPrevilages(user);
      })
    }
  }

  extractPrevilages(user: User) {
    if (this.currentLayoutName == Constants.DEFAULT_LAYOUT_NAME) {
      this.modifyAllowed = false;
    } else {
      this.modifyAllowed = true;
    }
  }
  updateModelToFormControl() {

    this.questionForm = this.fb.group({
      questionNameControl: [{ value: this.model.name, disabled: !this.modifyAllowed }, [Validators.required]],
      questionTypeControl: [{ value: this.model.questionType, disabled: !this.modifyAllowed }, [Validators.required]]
    });
  }

  updateFormControlToModel(): Question {
    if (this.questionForm) {
      let nameControl = this.questionForm.get('questionNameControl');

      this.model.name = nameControl != undefined ? nameControl.value : "";
      this.model.data = this.values;
    }

    return this.model;
  }
  get isSubQuestionValid(): boolean {
    if (this.values.length == 0 && this.subQuestionAllowedFor.includes(this.model.questionType)) {
      return false;
    }

    return !this.values.some((el: any) => el['name'].length == 0);
  }
  submit() {
    if (this.questionForm && (!this.questionForm.valid || !this.isSubQuestionValid)) {
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
      if (this.model.id == "") {
        this.questionServiceService.saveQuestion(this.model).subscribe((resposne: any) => {
          this.handleSaveOrUpdateSuccess(resposne);
        }, error => {
          this.handleSaveOrUpdateFailure(error);
        }
        );

      } else {
        this.questionServiceService.updateQuestion(this.model).subscribe((resposne: any) => {
          this.handleSaveOrUpdateSuccess(resposne);
        }, error => {
          this.handleSaveOrUpdateFailure(error);
        }
        );
      }


    }


  }
  handleSaveOrUpdateSuccess(resposne: any) {
    this.back();
  }

  handleSaveOrUpdateFailure(error: any) {
    this.back();
    if(error&&error['mensaje']){
      this.commonService.handleBadResponse(error);
    }
  }


  back() {
    this.activatedRoute.paramMap.subscribe(params => {
      let layoutName = params.get('layout');
      this.router.navigateByUrl("/questions/" + layoutName);
    });

  }
  loadData() {
    this.activatedRoute.paramMap.subscribe(params => {
      let questionId = params.get('id');
      let layoutName = params.get('layout');
      if (!layoutName) {
        this.back();
      } else if (questionId) {
        this.currentLayoutName = layoutName;
        this.loadPrevilages(this.userService.currentUser);
        let data = this.questionServiceService.getQuestionsByIdFromMap(layoutName, questionId);
        if (data) {
          this.model = data;
          this.updateModelToFormControl();
        } else {
          this.questionServiceService.getQuestionById(questionId).subscribe((question: Question) => {
            if (question) {
              this.model = question;
              this.updateModelToFormControl();
              this.values = question.data;
            } else {
              this.back();
            }

          })
        }


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


  previewQuestions(): void {
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      height: '40%',
      width: '60%',
      data: [this.updateFormControlToModel()]
    });
  }

  get name() {
    if (this.questionForm) {
      return this.questionForm.get('questionNameControl');
    } else {
      return "";
    }

  }

  get questionType() {
    if (this.questionForm) {
      return this.questionForm.get('questionType');
    } else {
      return "";
    }

  }


}
