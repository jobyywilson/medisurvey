import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { UserService } from 'src/app/service/user.service';
import { QuestionLayot } from 'src/model/questionlayout';
import { CloneDialogComponent } from '../clone-dialog/clone-dialog.component';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { Constants } from '../constant';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {



  questionLayoutList: QuestionLayot[] = [];
  constructor(private questionServiceService: QuestionServiceService,
     private dialog: MatDialog,
     private userService: UserService,
     private commonService: CommonService) {
    this.loadQuestionLayout();
  }

  ngOnInit(): void {
  }

  loadQuestionLayout() {
    this.questionServiceService.getQuestionLayouts().subscribe((data: QuestionLayot[]) => {
      this.questionLayoutList = data;
    });
  }
  changeActiveLayout(layoutName:string){
    const dialogRef =this.dialog.open(ConfirmationDialog, {
      data: {
        message: Constants.QTN_ACTIVE_LAYOUT + layoutName +Constants.AS_ACTIVE
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.changeActiveLayout(layoutName).subscribe((data:any)=>{

          if(data&&data['statusCode']==200){
            this.loadQuestionLayout();
          }
    
        });
      }
    });
    

  }

  
  clone(layout: QuestionLayot) {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: layout,
    });
    dialogRef.afterClosed().subscribe((newLayoutName: string) => {
      if(newLayoutName.length>0){
        this.questionServiceService.clone(layout.setName,newLayoutName).subscribe((response:any)=>{
          if(response&&response['statusCode']==Constants.OK){
            this.loadQuestionLayout();
          }
      },error=>{
        this.commonService.handleErrorResponse(error);
      }
      
      );
      }
     


  });

}
}