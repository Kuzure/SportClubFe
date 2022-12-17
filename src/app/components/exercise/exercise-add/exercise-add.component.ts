import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise-add',
  templateUrl: './exercise-add.component.html',
  styleUrls: ['./exercise-add.component.scss'],
})
export class ExerciseAddComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private exerciseService: ExerciseService
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: any;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';

  public addGroupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.addGroupForm.invalid) {
      const value = JSON.stringify(this.addGroupForm.value);
      this.usermodel = JSON.parse(value);
      this.exerciseService.addExercise(this.usermodel).subscribe(
        () => {
          this.ruter.navigate(['/exercise']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  public onBack() {
    this.ruter.navigate(['/exercise']);
  }
  getErrorMessage(field: string) {
    if (this.addGroupForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
