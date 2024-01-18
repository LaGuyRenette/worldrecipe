import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable,catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  API_URL: string = 'http://localhost:8000/api';

  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //REGISTER 

  register(user: User) : Observable<any>{
    let API_URL = `${this.API_URL}/register`;
    return this.httpClient
    .post(API_URL,user)
    .pipe(catchError(this.handleError))
    console.log("vieux authservice a supprimer")
  }
//LOGIN
  login(user: User) : Observable<any>{
    let API_URL = `${this.API_URL}/login`;
    return this.httpClient
    .post(API_URL,user)
    .pipe(catchError(this.handleError))
  }
  //GET ONE USER
  getUser(id: any){
    let API_URL = `${this.API_URL}/read-user/${id}`;
    return this.httpClient.get(API_URL, {headers: this.HttpHeaders})
    .pipe(tap((res:any) => {
      console.log('Raw data from server:',res);
    }),
    map((res:any) => {
      return res || {};
    }),
    catchError(this.handleError)
    );
  }

  //GET ALL USERS
  getUsers(){
    return this.httpClient.get(`${this.API_URL}`)
  }

  //UPDATE USER

  updateUser(id:any, user: any): Observable<any>{
    let API_URL = `${this.API_URL}/update-user/${id}`;
    return this.httpClient
      .put(API_URL, user, { headers: this.HttpHeaders})
      .pipe(catchError(this.handleError));
  }

  //DELETE USER

  deleteUser(id:any): Observable<any>{
    let API_URL = `${this.API_URL}/delete-user/${id}`;
    return this.httpClient
          .delete(API_URL, {headers: this.HttpHeaders})
          .pipe(catchError(this.handleError));
  }


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
