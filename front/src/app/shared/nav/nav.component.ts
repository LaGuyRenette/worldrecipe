import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isLogged: boolean =false;

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authService.isLoggedEmitter.subscribe(res => this.isLogged = res);
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToRegister(){
    this.router.navigate(['/register']);
  }
  goToRecipes(){
    this.router.navigate(['/recipes'])
  }

}
