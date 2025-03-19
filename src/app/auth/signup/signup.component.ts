import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
@Component({
  selector: 'app-signup',
  imports: [NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z+])*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom Validator for Password Match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
    } else {
      console.log('Form Invalid!');
    }
  }
}

