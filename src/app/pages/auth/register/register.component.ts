import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { ButtonDirective } from "primeng/button";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../../core/services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonDirective,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  private authService = inject(AuthService);
  private messageService = inject(MessageService)
  public passwordStrength: number = 0;
  public showPasswordStrength: boolean = false;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  register(){
    const formValue = this.registerForm.value;

    const registerData = {
      email: formValue.email,
      password: formValue.password
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario Creado Con Éxito' });
        this.registerForm.reset()
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Success', detail: 'Error al crear el Usuario' });
      }
    })
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onPasswordInput() {
    const password = this.registerForm.get('password')?.value || '';
    this.showPasswordStrength = password.length > 0;
    this.passwordStrength = this.calculatePasswordStrength(password);
  }

  calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[\W]/.test(password)) strength += 20;
    return strength;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // Handle the registration logic here
    console.log('Form Submitted', this.registerForm.value);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
