import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/service/User';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router){

      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[ Validators.required, Validators.minLength(9)]]
      
    })
  }
    ngOnInit(){}
onSubmit(){
  if(this.registerForm.valid){
    this.authService.register(this.registerForm.value)
    .subscribe({
    next: (result) => {
      console.log('userAdded' , result);
      
    },
    error:(error)=>{
      console.error('error is:' , error);
    },
    complete: () => {
      this.router.navigateByUrl('/login');
    }
  });
  }else{
    console.log('formInvalid');
  }
}
}

