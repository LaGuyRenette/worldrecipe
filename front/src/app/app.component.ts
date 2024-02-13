import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged: boolean = false;
  title = 'yumami';
  
  constructor(
    private authService: AuthService
    ){
      this.authService.isLoggedEmitter.subscribe(res => this.isLogged = res);
    }

}
