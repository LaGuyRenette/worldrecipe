import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment.developement';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    //HTTP HEADERS
    HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    isLoggedEmitter : EventEmitter<boolean> = new EventEmitter();
 

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) {
     this.handleLoginStatus();
     }

    register(credentials: FormGroup): Observable<any>{
      console.log("nouveau auth service")
      return this.http.post(`${environment.API}register`, credentials )
    }

    login(credentials: FormGroup): Observable<any>{
      console.log("authservice")
      return this.http.post(`${environment.API}login`, credentials);
    }

    logout():Observable<any>{
      console.log("logout front auth service")
      return this.http.get(`${environment.API}logout`);
    }

    handleMe(): Observable<any> {
      return this.http.get<boolean>(`${environment.API}me`)
        .pipe(
          tap(res => this.isLoggedEmitter.emit(res))
        );
    }

    isAdmin():Observable<any>{
      console.log('inside Authservice is admin')
      return this.http.get(`${environment.API}admin`);
    }
  

    handleLoginStatus(){
      this.handleMe().subscribe({
        next: (res)=> {
          console.log("resultat de handleMe:", res)
          this.isLoggedEmitter.emit(res)
        },
        error: (error) => {
          console.error("erreur lié a handleLogin,Me:" , error)
          this.isLoggedEmitter.emit(false)
        }
    })
  }
}
