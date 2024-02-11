import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent { 
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