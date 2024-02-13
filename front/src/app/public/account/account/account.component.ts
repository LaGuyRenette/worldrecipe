import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NavigationComponent } from 'src/app/shared/navigation/navigation.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  isLogged: boolean = false;
  showActionActions: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  )
  {
    
  }
  ngOnInit(){
    this.authService.handleLoginStatus();
    this.authService.isLoggedEmitter.subscribe(res => this.isLogged = res);
  }
  
  
  logout(){
    this.authService.logout().subscribe();
    this.router.navigate(["/login"]);
    this.isLogged = false;
  }

}

