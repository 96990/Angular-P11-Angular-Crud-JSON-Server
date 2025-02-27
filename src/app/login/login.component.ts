import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [MessageModule, InputTextModule, ButtonModule, PasswordModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService);
  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    console.log(form.value);
  }
}