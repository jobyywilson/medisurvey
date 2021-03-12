import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';
import { URL } from '../shared/url';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User =this.currentUserInfo;
  
  constructor(private http: HttpClient,private commonService : CommonService,private router: Router) { 
    this.loadUserInfo();
  }

  fetchCurrentUserInfo():Observable<User>{
    return this.commonService.get(URL.USERS);;
  }
  extractUserInfo(response:User):User{
    return response;
  }

  public loadUserInfo(){
    this.fetchCurrentUserInfo().subscribe((user:User)=>{
      this.currentUser = this.extractUserInfo(user);
     });
  }
  

  public get currentUserInfo(): User {
    if(!this.currentUser){
      null;
    }
    return this.currentUser;
  }

  changeActiveLayout(layoutName:string):Observable<any>{
    let activeLayoutReq = { "layoutName":layoutName}
    return this.commonService.post(URL.CHANGE_ATV_LAYOUT,activeLayoutReq);
  }

  logout(){
    window.location.reload();
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text'
    };
    this.commonService.get(URL.LOGOUT,httpOptions).subscribe(rep=>{
    });
  }

}
