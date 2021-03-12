
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from 'src/model/question';
import { URL } from '../shared/url';
import { AuthenticationServiceService } from './authentication-service.service';
import { CommonService } from './common.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  public dataMap: Map<string, Question> = new Map<string, Question>();

  constructor(private commonService: CommonService,
     private authenticationServiceService: AuthenticationServiceService,
      private userService: UserService) {

  }
  extractData(response: any) {
    let questionList: Question[] = [];
    if(response && response['data']){
      let entrieArray = Object.entries(response['data']);
      let map = new Map(entrieArray);
      this.dataMap.clear();
      map.forEach((object: any, key) => {
        let question = new Question(object['id'], object['name'], object['questionType'], object['setName'], object['data']);
        this.dataMap.set(object['id'], question);
        questionList.push(object);
      })
    }
    

    return questionList;
  }

  getQuestionsByLayout(layoutName: string | null) {
    return this.commonService.get(URL.GET_ALL_QUESTIONS + layoutName);
  }

  getQuestionsByIdFromMap(layoutName: string, questionId: string): Question | any {

    if (questionId == "new") {
      if (this.dataMap.size >= 10) {
        return undefined;
      }
      return this.createEmptyQuestion(layoutName);
    } else {
      if (this.dataMap.size == 0) {
        return null;
      } else {
        let question = this.dataMap.get(questionId);
        return question;
      }

    }

  }
  createEmptyQuestion(layoutName: string): Question {

    return new Question("", "", "", layoutName, []);
  }
  getQuestionById(id: string): Observable<any> {
    return this.commonService.get(URL.GET_QUESTION_BY_ID + id);

  }

  getQuestions(): Observable<any> {
    return this.commonService.get(URL.GET_ACTIVE_QUESTION_SET);

  }

  getQuestionLayouts(): Observable<any> {
    return this.commonService.get(URL.GET_QUESTION_LAYOUTS);

  }

  clone(oldLayoutName: string, newLayoutName: string): Observable<any> {
    let cloneReq = { 'oldSetName': oldLayoutName, 'newSetName': newLayoutName };
    return this.commonService.post(URL.CLONE_LAYOUT, cloneReq);

  }

  deleteQuestion(id: string): Observable<any> {
    return this.commonService.delete(URL.DELETE_QUESTION + id);
  }

  saveQuestion(question: Question):Observable<Question> {
    return this.commonService.post(URL.SAVE_QUESTION, question);
  }

  updateQuestion(question: Question):Observable<Question> {

    return this.commonService.put(URL.UPDATE_QUESTION, question);
  }


  isNumber(value: String | string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }


}
