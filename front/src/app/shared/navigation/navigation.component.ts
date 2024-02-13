import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
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
  
  showActionAccount(){
    this.showActionActions= !this.showActionActions
  }

  logout(){
    this.authService.logout().subscribe();
    this.router.navigate(["/login"]);
    this.isLogged = false;
  }
  onBack(){
    window.history.back();
  }

}
