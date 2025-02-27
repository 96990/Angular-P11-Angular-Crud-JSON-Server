import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [MessageModule, InputTextModule, ButtonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService);
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}