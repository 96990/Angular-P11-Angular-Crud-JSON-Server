import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService, userDetails } from '../auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MessageModule, InputTextModule, ButtonModule, PasswordModule, FormsModule, NgIf, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: userDetails={
    username: '',
    password: ''
  };
  private msgService = inject(MessageService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  onSubmit(form: NgForm) {
    console.log("dfd0",form.value, this.user);
    this.loginService.login(this.user).subscribe(user =>{
      if(user){
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
        this.router.navigate(['/products']);
      }else{
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
      }
    });
  }
}