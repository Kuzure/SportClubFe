import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseModel } from 'src/app/models/exercise-list-model';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
})
export class ExerciseDetailsComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: ExerciseModel;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';
  exercise: ExerciseModel;

  public editexerciseForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let exerciseid = String(routeParams.get('id'));
    this.getExercise(exerciseid);
  }

  getExercise(exerciseId: string) {
    this.exerciseService.getExercise(exerciseId).subscribe((res) => {
      this.exercise = res;
      this.iniFormGroup();
    });
  }

  iniFormGroup() {
    this.editexerciseForm.setValue({
      id: this.exercise.id,
      name: this.exercise.name,
      description: this.exercise.description,
    });
  }

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.editexerciseForm.invalid) {
      const value = JSON.stringify(this.editexerciseForm.value);
      this.usermodel = JSON.parse(value);
      this.exerciseService.updateExercise(this.usermodel).subscribe(
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
    if (this.editexerciseForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
