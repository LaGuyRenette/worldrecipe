import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ){

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[ Validators.required, Validators.minLength(9)]]
      
    })
  }

onSubmit(){
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value)
    .subscribe({
    next: (result) => {
      console.log('userconnected' , result); 
    },
    error:(error)=>{ 
      if (error.status === 401) {
      console.error('Login failed: Invalid credentials', error);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    },
    complete: () => {
      this.authService.handleMe().subscribe();
      this.router.navigateByUrl('/');
      
    }
  });
  }else{
    console.log('formInvalid');
  }
}
}