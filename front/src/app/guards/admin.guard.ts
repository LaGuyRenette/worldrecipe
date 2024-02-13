import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard{

  constructor(
    private authService : AuthService,
    private router : Router
  ){
  }
  canActivate():Observable<any> {
   return this.authService.isAdmin().pipe(
    map(isAdmin => {
      if(isAdmin){
        console.log('is Admin')
        return true;
      }else{
        console.log('is User')
        return this.router.navigate(['/'])
      }
    })
  ) 
  }
}
