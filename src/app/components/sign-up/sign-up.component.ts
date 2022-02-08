import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
// import { TooltipPosition } from '@angular/material/tooltip';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
// export class TooltipAutoHideExample {
//   state: TooltipPosition[] = ['below', 'above', 'left', 'right'];
//   position = new FormControl(this.state[0]);
// 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      phonenumber: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      state: new FormControl('',),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('',Validators.required),
      gender: new FormControl('',),
      dob: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(private authService: AuthService, private router: Router, private toast: HotToastService) {}

  ngOnInit(): void {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get phonenumber() {
    return this.signUpForm.get('phonenumber');
  }

  get address() {
    return this.signUpForm.get('address');
  }

  get state() {
    return this.signUpForm.get('state');
  }

  get city() {
    return this.signUpForm.get('city');
  }

  get pincode() {
    return this.signUpForm.get('pincode');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }

  get dob() {
    return this.signUpForm.get('dob');
  }

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }
  console.log("form",this.signUpForm.value)
    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(name, email, password).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing up...',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
