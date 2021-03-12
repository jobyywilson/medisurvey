import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Constants } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,private dialog: MatDialog) { }

  
  get httpOptions():any{
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }
  
  get(path:string,httpOptions?:any): Observable<any> {
    if(!httpOptions){
      httpOptions = this.httpOptions;
    }
    return this.http.get(environment.url + path,httpOptions);
  }

  delete(path:string): Observable<any> {
    return this.http.delete(environment.url + path);
  }

  post(path:string,body:any,httpOptions?:any): Observable<any> {
    if(!httpOptions){
      httpOptions = this.httpOptions;
    }
    return this.http.post<any>(environment.url+path,body,httpOptions);
  }

  put(path:string,body:any,httpOptions?:any): Observable<any> {
    if(!httpOptions){
      httpOptions = this.httpOptions;
    }
    return this.http.put<any>(environment.url+path,body,httpOptions);
  }
  handleBadResponse(response:any){
    let message = response['mensaje'];
    this.dialog.open(AlertDialogComponent, {
      data: {
        message: message,
        buttonText: {
          cancel: Constants.OKAY
        }
      },
    });

  }

  handleErrorResponse(response:any){
    let message = response.error['mensaje'];
    this.dialog.open(AlertDialogComponent, {
      data: {
        message: message,
        buttonText: {
          cancel: Constants.OKAY
        }
      },
    });

  }
  showConfirmDialog(message:string,ok?:string,cancel?:string){
    return this.dialog.open(ConfirmationDialog, {
      data: {
        message: message,
        ok: Constants.YES,
        cancel: Constants.NO
        
      },
    });
  }
  

}
