import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router){

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[ Validators.required, Validators.minLength(9)]]
      
    })
  }
    ngOnInit(){}
onSubmit(){
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value)
    .subscribe({
    next: (result) => {
      console.log('userconnected' + result);
      
    },
    error:(error)=>{
      console.error('erreur' + error);
    },
    complete: () => {
      this.router.navigateByUrl('/');
    }
  });
  }else{
    console.log('formInvalid');
  }
}
}

