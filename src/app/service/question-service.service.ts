
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from 'src/model/question';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  public dataList: Question[] = [];
  public dataMap: Map<number, Question> = new Map<number, Question>();
  private id: number = 0;
  private noAccess = ['No access', ""]

  constructor(private http: HttpClient, private authenticationServiceService: AuthenticationServiceService) {

  }
  extractData(data: any) {
    for (let i = 0; i < data.length; i++) {
      let userInfo = this.authenticationServiceService.currentUserInfo;
      let question = new Question(data[i]['id'], data[i]['name'], data[i]['questionType'], data[i]['accessRights'], data[i]['data']);
      this.dataMap.set(data[i]['id'], question)
      this.id = Math.max(this.id, data[i]['id']);
    }
    return this.updateQuestionListToStorage();
  }

  getQuestionsById(routeParm: any): Question | any {
    if (this.dataMap.size == 0) {
      this.getQuestions().subscribe(data => {
        this.extractData(data);
      });
    }
    if ((typeof routeParm === 'string' || routeParm instanceof String) && !this.isNumber(routeParm)) {
      if (this.dataMap.size >= 10) {
        return undefined;
      }
      if (routeParm == "new") {
        return this.createEmptyQuestion();
      }
    } else {
      
      let question = this.dataMap.get(Number(routeParm));
      if (question != undefined && !this.authenticationServiceService.isAdmin && this.noAccess.includes(question.accessRights)) {
        return undefined;
      }



      return question;
    }


  }
  createEmptyQuestion(): Question {

    return new Question(this.getSequenceId(), "", "", "", []);
  }


  getQuestions(): Observable<any> {
    if (localStorage.hasOwnProperty('questionList')) {
      let questionListRaw = localStorage.getItem('questionList');
      let questionList: Question[] | null = null;
      if (questionListRaw) {
        questionList = JSON.parse(questionListRaw);
      }
      return of(questionList);
    }
    return this.http.get("./assets/data/data.json");
  }

  deleteQuestion(id: number) {
    this.dataMap.delete(id);
    this.updateQuestionListToStorage();
  }

  saveQuestion(data: Question) {
    let id = data.id;
    if (id == undefined) {
      id = this.id;
      this.id = this.id + 1;
    }
    this.dataMap.set(id, data);
    this.updateQuestionListToStorage();

  }
  updateQuestionListToStorage(): Question[] {
    let questionList = Array.from(this.dataMap.values());
    localStorage.setItem('questionList', JSON.stringify(questionList));
    return questionList;
  }

  getSequenceId(): number {
    this.id = this.id + 1;
    return this.id;
  }
  
  isNumber(value: String |string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }



}
