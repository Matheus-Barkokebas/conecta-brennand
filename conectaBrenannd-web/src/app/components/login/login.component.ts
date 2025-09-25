import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SERVICES_TOKEN } from '../../service/service.token';
import { SnackbarManagerService } from '../../service/ui/snackbar-manager.service';
import { AuthService } from '../../service/auth/auth.service';
import { ISnackbarManagerService } from '../../service/ui/isnackbar-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  lateralImage = 'assets/img/lateral.png';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.auth.login({ email, senha }).subscribe({
        next: () => {
          this.snackBarManager.show('Login efetuado com sucesso');
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.snackBarManager.show('Email ou Senha incorretos');
        },
      });
    }
  }

  navigateTo(path: string) {
    this.dialog.closeAll();
    this.router.navigate([path]);
  }
}
