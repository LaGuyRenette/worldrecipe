import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment.developement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedEmitter : EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient) { }

    register(credentials: FormGroup): Observable<any>{
      console.log("nouveau auth service")
      return this.http.post(`${environment.API}register`, credentials )
      
    }

    login(credentials: FormGroup): Observable<any>{
      console.log("authservice")
      return this.http.post(`${environment.API}login`, credentials);
    }

    logout():Observable<any>{
      return this.http.get(`${environment.API}logout`);
    }

    me(): Observable<any> {
      return this.http.get<boolean>(`${environment.API}me`)
        .pipe(
          tap(res => this.isLoggedEmitter.emit(res))
        );
    }
}
