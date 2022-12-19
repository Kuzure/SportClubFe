import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoachGroupList, CoachList } from 'src/app/models/coach-list-model';
import { ExerciseListModel } from 'src/app/models/exercise-list-model';
import { GroupDetailscompetitorModels } from 'src/app/models/group-details.model';
import { GroupListModel } from 'src/app/models/group-list.model';
import { CoachService } from 'src/app/service/coach.service';
import { CompetitorService } from 'src/app/service/competitor.service';
import { ExerciseService } from 'src/app/service/exercise.service';
import { GroupService } from 'src/app/service/group.service';
import { CoachAddToGroupComponent } from '../../coach/coach-add-to-group/coach-add-to-group.component';

@Component({
  selector: 'app-group-coaches-add',
  templateUrl: './group-coaches-add.component.html',
  styleUrls: ['./group-coaches-add.component.scss'],
})
export class GroupCoachesAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private competitorService: CompetitorService,
    private coachService: CoachService,
    private exerciseService: ExerciseService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CoachAddToGroupComponent>,
    private ruter: Router
  ) {}
  selectedCoach: Array<SelectedCoach> = [];
  coaches: Array<CoachList>;
  model: CoachesAddToGroup;
  isLoginFailed = false;
  errorMessage = '';
  coachArrays: Array<CoachGroupList> = [];
  arrayId: Array<string> = [];

  freecoachList: CoachList[];
  getFreeCoach(groupId: string) {
    this.coachService.getFreeCoach(groupId).subscribe((res) => {
      this.freecoachList = res;
      this.initSelectedGroup();
    });
  }
  ngOnInit(): void {
    this.getFreeCoach(this.group.groupId);
  }
  initSelectedGroup() {
    this.freecoachList.forEach((x) => {
      const obj = {
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        selected: false,
      };
      this.selectedCoach.push(obj);
    });
  }
  onBack(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.selectedCoach.forEach((x) => {
      if (x.selected === true) {
        this.arrayId.push(x.id);
      }
    });
    this.model = { groupId: this.group.groupId, coaches: this.arrayId };
    this.coachService.addCoachesToGroup(this.model).subscribe(
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

export class SelectedCoach {
  id: string;
  firstName: string;
  lastName: string;
  selected: boolean;
}
export class CoachesAddToGroup {
  groupId: string;
  coaches: Array<string>;
}
