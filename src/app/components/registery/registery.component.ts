import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Gender, Kyu, RegisteryUser } from 'src/app/models/user-register-model';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-registery',
  templateUrl: './registery.component.html',
  styleUrls: ['./registery.component.scss'],
})
export class RegisteryComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private authService: AuthService,
    private ruter: Router
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: RegisteryUser;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';

  genders: any[] = [
    { name: 'male', value: 1 },
    { name: 'female', value: 2 },
  ];

  kyus: any[] = [
    { name: 'kyu1', value: 1 },
    { name: 'kyu2', value: 2 },
    { name: 'kyu3', value: 3 },
    { name: 'kyu4', value: 4 },
    { name: 'kyu5', value: 5 },
    { name: 'kyu6', value: 6 },
    { name: 'dan1', value: 7 },
    { name: 'dan2', value: 8 },
    { name: 'dan3', value: 9 },
  ];

  public registeryForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
      Validators.minLength(8),
    ]),
    gender: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    is_Paid: new FormControl(false),
  });

  ngOnInit(): void {}

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.registeryForm.invalid) {
      console.warn(this.registeryForm.value);
      const gnder = this.genders.find(
        (x) => x.name == this.registeryForm.controls['gender'].value
      );
      const kyu = this.kyus.find(
        (x) => x.name == this.registeryForm.controls['degree'].value
      );
      const value = JSON.stringify(this.registeryForm.value);
      this.usermodel = JSON.parse(value);
      this.usermodel.gender = gnder!.value;
      this.usermodel.degree = kyu!.value;
      this.authService.register(this.usermodel).subscribe(
        () => {
          this.ruter.navigate(['/login']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  getErrorMessage(field: string) {
    if (this.registeryForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
