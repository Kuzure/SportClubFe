import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegisteryUser } from 'src/app/models/user-register-model';
import { CompetitorService } from 'src/app/service/competitor.service';

@Component({
  selector: 'app-competior-add',
  templateUrl: './competior-add.component.html',
  styleUrls: ['./competior-add.component.scss'],
})
export class CompetiorAddComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private competitorService: CompetitorService
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: RegisteryUser;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';

  genders: any[] = [
    { name: 'male', value: 0 },
    { name: 'female', value: 1 },
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

  public addCompetitorForm = new FormGroup({
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
    medicalExaminationExpiryDate: new FormControl('', Validators.required),
    isPaid: new FormControl(false),
  });

  ngOnInit(): void {}

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.addCompetitorForm.invalid) {
      console.warn(this.addCompetitorForm.value);
      const gnder = this.genders.find(
        (x) => x.name == this.addCompetitorForm.controls['gender'].value
      );
      const kyu = this.kyus.find(
        (x) => x.name == this.addCompetitorForm.controls['degree'].value
      );
      const value = JSON.stringify(this.addCompetitorForm.value);
      this.usermodel = JSON.parse(value);
      this.usermodel.gender = gnder!.value;
      this.usermodel.degree = kyu!.value;
      this.competitorService.addCompetitor(this.usermodel).subscribe(
        () => {
          this.ruter.navigate(['/competitor']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  public onBack() {
    this.ruter.navigate(['/competitor']);
  }
  getErrorMessage(field: string) {
    if (this.addCompetitorForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
