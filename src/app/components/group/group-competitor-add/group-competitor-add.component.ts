import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoachList, CoachGroupList } from 'src/app/models/coach-list-model';
import { CoachService } from 'src/app/service/coach.service';
import { CompetitorService } from 'src/app/service/competitor.service';
import { ExerciseService } from 'src/app/service/exercise.service';
import { GroupService } from 'src/app/service/group.service';
import { CoachAddToGroupComponent } from '../../coach/coach-add-to-group/coach-add-to-group.component';
import { CompetitorList } from './../../../models/competitorList-model';

@Component({
  selector: 'app-group-competitor-add',
  templateUrl: './group-competitor-add.component.html',
  styleUrls: ['./group-competitor-add.component.scss'],
})
export class GroupCompetitorAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private competitorService: CompetitorService,
    private coachService: CoachService,
    private exerciseService: ExerciseService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CoachAddToGroupComponent>,
    private ruter: Router
  ) {}
  selectedCompetior: Array<SelectedCompetitor> = [];
  competitors: Array<CompetitorList>;
  model: CompetitorAddToGroup;
  isLoginFailed = false;
  errorMessage = '';
  coachArrays: Array<CoachGroupList> = [];
  arrayId: Array<string> = [];

  freeCompetitorList: CompetitorList[];
  getFreeCoach(groupId: string) {
    this.competitorService.getFreeCompetitor(groupId).subscribe((res) => {
      this.freeCompetitorList = res;
      this.initSelectedGroup();
    });
  }
  ngOnInit(): void {
    this.getFreeCoach(this.group.groupId);
  }
  initSelectedGroup() {
    this.freeCompetitorList.forEach((x) => {
      const obj = {
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        selected: false,
      };
      this.selectedCompetior.push(obj);
    });
  }
  onBack(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.selectedCompetior.forEach((x) => {
      if (x.selected === true) {
        this.arrayId.push(x.id);
      }
    });
    this.model = { groupId: this.group.groupId, competitors: this.arrayId };
    this.competitorService.addCompetitorsGroup(this.model).subscribe(
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

export class SelectedCompetitor {
  id: string;
  firstName: string;
  lastName: string;
  selected: boolean;
}
export class CompetitorAddToGroup {
  groupId: string;
  competitors: Array<string>;
}
