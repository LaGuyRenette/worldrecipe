import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
 constructor(
  private authService: AuthService,
  private router: Router
 ){}
 canActivate():Observable<boolean> {
  // return this.authService.handleMe().pipe(
  //   map(message => {
  //     if(message){
  //       console.log("user is authentificate");
  //       return true;
  //     }else{
  //       console.log("user is not connected");
  //       this.router.navigate(['/account']);
  //       return false;
  //     }
  //   })
  // )
  return this.authService.handleMe().pipe(
    map((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        throw new Error('Unauthorized');
      }
    }),
    catchError((error) => {
      console.error('Erreur d\'authentification:', error);
      if (error.message === 'Unauthorized') {
        this.router.navigate(['/account']);
      } else {

        this.router.navigate(['/account']);
      }
      return of(false);
    })
  );
}
}
