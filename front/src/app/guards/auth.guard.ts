import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
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
  return this.authService.handleMe().pipe(
    switchMap(message => {
      if (message) {
        console.log("guard")
        return of(true)
      }else{
        this.router.navigate(["/"])
        console.log("guard")
        return of(false)
      }
    })
  ) 
 } 
}
