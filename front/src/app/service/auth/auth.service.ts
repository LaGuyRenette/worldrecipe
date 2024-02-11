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
     console.log(this.isAdmin)
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

    isAdmin(){
      // const cookies = document.cookie.split(';');
      // console.log('liste des cookies', cookies)
      // for (let i = 0; i < cookies.length; i ++){
      //   const cookieRole = cookies[i].trim();
      //   console.log("cookie en cours de traitement:", cookieRole)
      //   if(cookieRole.startsWith('role')){
      //     const roleValue =  cookieRole.substring('role='.length);
      //     console.log("valeur du role:", roleValue);
      //     const isAdmin = roleValue ==='admin';
      //     console.log("admin?:", isAdmin);

      //     return isAdmin;
      //   }

      //   }
      //   console.log("aucun cookie avec le nom role trouvé ou bien il n'est pas admin")
      //   return false;
      const cookies = this.cookieService.getAll();
      console.log(cookies)
      const roleValue = this.cookieService.get('role');
      console.log(roleValue)
      return roleValue === 'admin'   
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
