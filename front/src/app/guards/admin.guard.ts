import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
  canActivate(): boolean {
    if(this.authService.isAdmin()){
      console.log('is admin')
      return true
    }else{
      this.router.navigate(['/']);
      console.log('is user')
      return false;
    }
  }
}
