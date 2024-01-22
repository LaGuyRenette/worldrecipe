import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment.developement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isLoggedEmitter : EventEmitter<boolean> = new EventEmitter();


  constructor(
    private http: HttpClient) {
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

    me(): Observable<any> {
      return this.http.get<boolean>(`${environment.API}me`)
        .pipe(
          tap(res => this.isLoggedEmitter.emit(res))
        );
        
    }
    
    handleLoginStatus(){
      this.me().subscribe({
        next: (res)=> {
          this.isLoggedEmitter.emit(res)
        },
        error: (error) => {
          this.isLoggedEmitter.emit(false)
        }
    })
  }
}
