import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoachList, CoachGroupList } from 'src/app/models/coach-list-model';
import { CoachService } from 'src/app/service/coach.service';
import { CompetitorService } from 'src/app/service/competitor.service';
import { ExerciseService } from 'src/app/service/exercise.service';
import { GroupService } from 'src/app/service/group.service';
import { CoachAddToGroupComponent } from '../../coach/coach-add-to-group/coach-add-to-group.component';
import { ExerciseListModel } from './../../../models/exercise-list-model';

@Component({
  selector: 'app-group-exercise-add',
  templateUrl: './group-exercise-add.component.html',
  styleUrls: ['./group-exercise-add.component.scss'],
})
export class GroupExerciseAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<CoachAddToGroupComponent>,
  ) {}
  selectedExercise: Array<SelectedExercise> = [];
  exercises: Array<CoachList>;
  model: ExerciseAddToGroup;
  isLoginFailed = false;
  errorMessage = '';
  coachArrays: Array<CoachGroupList> = [];
  arrayId: Array<string> = [];

  freecoachList: ExerciseListModel[];
  getFreeExercise(groupId: string) {
    this.exerciseService.getFreeExercise(groupId).subscribe((res) => {
      this.freecoachList = res;
      this.initSelectedGroup();
    });
  }
  ngOnInit(): void {
    this.getFreeExercise(this.group.groupId);
  }
  initSelectedGroup() {
    this.freecoachList.forEach((x) => {
      const obj = {
        id: x.id,
        name: x.name,
        selected: false,
      };
      this.selectedExercise.push(obj);
    });
  }
  onBack(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.selectedExercise.forEach((x) => {
      if (x.selected === true) {
        this.arrayId.push(x.id);
      }
    });
    this.model = { groupId: this.group.groupId, exercises: this.arrayId };
    this.exerciseService.addExerciseToGroup(this.model).subscribe(
      () => {
        this.dialogRef.close();
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}

export class SelectedExercise {
  id: string;
  name: string;
  selected: boolean;
}
export class ExerciseAddToGroup {
  groupId: string;
  exercises: Array<string>;
}
