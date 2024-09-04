import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { ButtonDirective } from "primeng/button";
import {AuthService} from "../../../../core/services/auth.service";

import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonDirective,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: any)=> {
        console.log(data)
        sessionStorage.setItem("token", data.token)
        sessionStorage.setItem("user_id", data.userId);
        this.router.navigate(['/home']);
      },
      error: (err) =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
      }
    })
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['davillera@mail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
