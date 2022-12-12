import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachAdd } from 'src/app/models/coach-add-model';
import { CoachService } from 'src/app/service/coach.service';
import { CoachList, CoachUpdate } from './../../../models/coach-list-model';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coach-detail.component.html',
  styleUrls: ['./coach-detail.component.scss'],
})
export class CoachDetailComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private coachService: CoachService,
    private route: ActivatedRoute
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: CoachUpdate;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';
  coach: CoachUpdate;

  genders: any[] = [
    { name: 'Male', value: 'Mężczyzna' },
    { name: 'Female', value: 'Kobieta' },
  ];

  public editCompetitorForm = new FormGroup({
    id: new FormControl('', Validators.required),
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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let coachid = String(routeParams.get('id'));
    this.getCoach(coachid);
  }

  getCoach(coachId: string) {
    this.coachService.getCoach(coachId).subscribe((res) => {
      this.coach = res;
      this.iniFormGroup();
    });
  }

  iniFormGroup() {
    this.editCompetitorForm.setValue({
      id: this.coach.id,
      firstName: this.coach.firstName,
      lastName: this.coach.lastName,
      dateOfBirth: this.coach.dateOfBirth,
      phoneNumber: this.coach.phoneNumber,
      gender: this.coach.gender,
      coachClass: this.coach.coachClass.toString(),
    });
  }

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.editCompetitorForm.invalid) {
      console.warn(this.editCompetitorForm.value);
      const gnder = this.genders.find(
        (x) => x.value === this.editCompetitorForm.controls['gender'].value
      );
      const value = JSON.stringify(this.editCompetitorForm.value);
      this.usermodel = JSON.parse(value);
      this.usermodel.gender = gnder!.name;
      this.usermodel.coachClass = Number(this.usermodel.coachClass);
      this.coachService.updateCoach(this.usermodel).subscribe(
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
    if (this.editCompetitorForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
