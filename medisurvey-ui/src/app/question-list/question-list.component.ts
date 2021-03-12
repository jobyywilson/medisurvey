import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/model/question';
import { User } from 'src/model/user';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { CommonService } from '../service/common.service';
import { QuestionServiceService } from '../service/question-service.service';
import { UserService } from '../service/user.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { Constants } from '../shared/constant';



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  public currentLayoutName: string = "";
  public isDeleteAllowed: boolean = false;
  public isAddAllowed: boolean = false;

  constructor(private questionServiceService: QuestionServiceService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService,
    private commonService: CommonService) {
    this.loadData();

  }

  displayedColumns: string[] = ['id', 'name', 'questionType', 'actions'];
  dataSource = new MatTableDataSource<Question>([]);


  public loadData() {
    this.activatedRoute.paramMap.subscribe(params => {
      let layoutName = params.get('layout');
      if (layoutName) {
        this.currentLayoutName = layoutName;
        this.questionServiceService.getQuestionsByLayout(layoutName).subscribe(response => {
            this.dataSource.data = this.questionServiceService.extractData(response);
        },error=>{
          this.router.navigateByUrl("/");
        });
      } else {
        this.loadDataByQuestionSet(this.userService.currentUser);
      }
      this.loadPrevilages(this.userService.currentUser);

    });
  }

  loadDataByQuestionSet(user:User) {
      if (user) {
        this.router.navigateByUrl("/questions/" + user.defaultQuestionSet);
      } else {
        this.router.navigateByUrl("/questions/" + Constants.DEFAULT_LAYOUT_NAME);
      }
  }
  extractPrevilages(user:User){
    if(user.role==Constants.ADMIN){
      if(this.currentLayoutName==Constants.DEFAULT_LAYOUT_NAME){
        this.isDeleteAllowed = false;
        this.isAddAllowed = false;
      }else{
        this.isDeleteAllowed = true;
        this.isAddAllowed = true;
      }
    }else{
      if(this.currentLayoutName==Constants.DEFAULT_LAYOUT_NAME){
        this.isAddAllowed = false;
      }else{
        this.isAddAllowed = true;
      }
      this.isDeleteAllowed = false;
    }
   
    
  }
  loadPrevilages(user:User){
    if(user){
      this.extractPrevilages(user);
    }else{
      this.userService.fetchCurrentUserInfo().subscribe((user:User)=>{
        this.extractPrevilages(user);
      })
    }
  }



  addQuestion() {
    if (!this.validateQuestionLimit()) {
      this.router.navigateByUrl("/questions/" + this.currentLayoutName + "/new");
    }
  }

  validateQuestionLimit(): boolean {
    if (this.dataSource.data.length >= 10) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          message: Constants.QTN_LIMIT_EXCEEDED,
          buttonText: {
            cancel: Constants.OKAY
          }
        },
      });
      return true;
    }
    return false;
  }

  viewQuestion(question: Question) {
    this.router.navigateByUrl(Constants.QUESTION_SLASH + this.currentLayoutName + Constants.FORWARD_SLASH + question.id);

  }
  deleteQuestion(element: Question) {
    const dialogRef = this.commonService.showConfirmDialog(Constants.QTN_DLTE_CONFIRM + element.name + "\" ?");
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.questionServiceService.deleteQuestion(element.id).subscribe((resposne: any) => {
          if (resposne && resposne['statusCode'] != Constants.OK) {
            this.commonService.handleBadResponse(resposne);
          } else {
            this.loadData();
          }
        });

      }
    });


  }
  previewQuestions(): void {
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      height: '60%',
      width: '60%',
      data: this.dataSource.filteredData
    });


  }

}
