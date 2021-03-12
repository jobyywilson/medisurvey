import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role, User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  authenticated = false;

  constructor(private http: HttpClient) {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      currentUser = "{}";
    }
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(credentials: any, callback: any) {

    this.http.get('http://localhost:8080/user').subscribe((response: any) => {
      if (response['username']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  public get currentUserInfo(): User | null {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }
  public get isAdmin(): boolean {
    if (this.currentUserInfo) {
      if (this.currentUserInfo.role == "ADMIN") {
        return true;
      }
    }
    return false;
  }


  public get isUserLoggedIn(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return true;
    }
    return false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get("./assets/data/user.json");
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  extactUserInfo(userList: any, username: string, password: string): User | null {
    for (let index = 0; index < userList.length; index++) {
      if (userList[index]['username'] == username && userList[index]['password'] == password) {
        let authdata = window.btoa(username + ':' + password);
        let user: User = new User(username, password,
          userList[index]['firstName'],
          userList[index]['lastName'],
          userList[index]['role'],"",
          authdata)
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }
    }
    return null;;
  }
}
