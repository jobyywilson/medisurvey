import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/model/question';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { QuestionServiceService } from '../service/question-service.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Constants } from '../shared/constant';



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public isAdmin: boolean;

  constructor(private questionServiceService: QuestionServiceService, private router: Router
    , private authenticationServiceService: AuthenticationServiceService,
    private dialog: MatDialog) {
    this.isAdmin = authenticationServiceService.isAdmin;
    this.loadData();

    this.dataSource.filterPredicate = (data: Question, accessRights: string) => this.checkRights(data,accessRights);
    this.applyFilter("No access")
  }

  displayedColumns: string[] = ['id', 'name', 'questionType', 'accessRights', 'actions'];
  dataSource = new MatTableDataSource<Question>([]);

  checkRights(data: Question, accessRights: string):boolean{

    if(!this.isAdmin&&data.accessRights==accessRights){
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    //  this.loadData();
  }

  public loadData() {
    this.questionServiceService.getQuestions().subscribe(data => {
      this.dataSource.data = this.questionServiceService.extractData(data);

      //this.questionServiceService.dataList = questionList;
    });



  }

  addQuestion() {

    if(!this.validateQuestionLimit()){
      this.router.navigateByUrl("/questions/new");
    }
    

  }

  validateQuestionLimit():boolean{
    if(this.dataSource.data.length>=10){
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

  viewQuestion(element: Question) {
    this.router.navigateByUrl("/questions/" + element.id);

  }
  deleteQuestion(element: Question) {
    const dialogRef =this.dialog.open(ConfirmationDialog, {
      data: {
        message: Constants.QTN_DLTE_CONFIRM + element.id +" ?",
        ok: Constants.YES,
        cancel: Constants.NO
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.questionServiceService.deleteQuestion(element.id);
        this.loadData();
      }
    });
   

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  previewQuestions(): void {
    console.log(this.dataSource.data)
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      height: '60%',
      width: '60%',
      data: this.dataSource.filteredData
    });


  }

}
