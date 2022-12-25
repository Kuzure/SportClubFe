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
        if (data.isError === false) {
          this.tokenStorage.set('Token', data.result);
          this.ruter.navigate(['/dashboard']);
        } else {
          this.errorMessage = data.result;
          this.isLoginFailed = true;
        }
      },
      (err) => {
        this.errorMessage = Object.values(err.error.errors).toLocaleString();
        this.isLoginFailed = true;
      }
    );
  }
}
