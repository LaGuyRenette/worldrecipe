import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
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
  canActivate():Observable<boolean| UrlTree> {
   return this.authService.isAdmin().pipe(
    map(isAdmin => {
      if(isAdmin){
        console.log('is Admin')
        return true;
      }else{
        console.log('is User')
        return this.router.createUrlTree(['/'])
      }
    }), catchError(()=> {
      console.log('error checking admin')
      return of(this.router.createUrlTree(['/']));
    }))
  }
}
