import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private ruter: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.set('Token', data);

        this.ruter.navigate(['/dashboard']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
