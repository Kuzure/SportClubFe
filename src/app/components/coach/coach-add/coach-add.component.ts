import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { CoachAdd } from 'src/app/models/coach-add-model';
import { RegisteryUser } from 'src/app/models/user-register-model';
import { CoachService } from 'src/app/service/coach.service';

@Component({
  selector: 'app-coach-add',
  templateUrl: './coach-add.component.html',
  styleUrls: ['./coach-add.component.scss'],
})
export class CoachAddComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private coachService: CoachService
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: CoachAdd;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';

  genders: any[] = [
    { name: 'male', value: 1 },
    { name: 'female', value: 2 },
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
    coachClass: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.addCompetitorForm.invalid) {
      console.warn(this.addCompetitorForm.value);
      const gnder = this.genders.find(
        (x) => x.name == this.addCompetitorForm.controls['gender'].value
      );
      const value = JSON.stringify(this.addCompetitorForm.value);
      this.usermodel = JSON.parse(value);
      this.usermodel.gender = gnder!.value;
      this.coachService.addCoach(this.usermodel).subscribe(
        () => {
          this.ruter.navigate(['/coach']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  public onBack() {
    this.ruter.navigate(['/coach']);
  }
  getErrorMessage(field: string) {
    if (this.addCompetitorForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
