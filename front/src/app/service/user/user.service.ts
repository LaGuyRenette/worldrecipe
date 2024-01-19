import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { environment } from 'src/environment/environment.developement';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  //HTTP HEADERS
  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor( 
    private httpClient : HttpClient) 
    { }

  //GET ALL USERS
  GetAllUsers() {
    return this.httpClient.get(`${environment.API}users`)
  }

//GET 1 User
GetOneUser(id: any){
  return this.httpClient.get(`${environment.API}user/${id}`, {headers: this.HttpHeaders}).pipe(
    tap((res: any) => {
      console.log('Raw data from server:', res);
    }),
    map((res :any) => {
      return res || {};
      }),
      catchError(this.handleError)
  );
}

//UPDATE
updateUser(id:any, data: any): Observable<any>{
  return this.httpClient
    .put(`${environment.API}update-user/${id}`, data, { headers: this.HttpHeaders})
    .pipe(catchError(this.handleError));
}
//DELETE
deleteUser(id:any): Observable<any>{
  return this.httpClient
        .delete(`${environment.API}delete-user/${id}`, {headers: this.HttpHeaders})
        .pipe(catchError(this.handleError));
}
//ERROR
  handleError(error: HttpErrorResponse){
    let errorMessage= '';
    if(error.error instanceof ErrorEvent) {
      //handle client error
      errorMessage = error.error.message;
    }else {
      //handle server error
      errorMessage = `Error: ${error.status}\nMessage: ${errorMessage}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
