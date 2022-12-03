import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompetitorGroupAdd } from 'src/app/models/competitor-group-add';
import { GroupListModel } from 'src/app/models/group-list.model';
import { CompetitorService } from 'src/app/service/competitor.service';
import { GroupService } from 'src/app/service/group.service';
import { CoachGroupList } from 'src/app/models/coach-list-model';
import { CoachService } from 'src/app/service/coach.service';

@Component({
  selector: 'app-coach-add-to-group',
  templateUrl: './coach-add-to-group.component.html',
  styleUrls: ['./coach-add-to-group.component.scss'],
})
export class CoachAddToGroupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public groupArray: any,
    private coachService: CoachService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CoachAddToGroupComponent>,
    private ruter: Router
  ) {}
  selectedGroups: Array<SelectedGroup> = [];
  groups: Array<GroupListModel>;
  model: CoachAddToGroup;
  isLoginFailed = false;
  errorMessage = '';
  groupArrays: Array<CoachGroupList> = [];
  arrayId: Array<string> = [];
  getGroup() {
    this.groupService.getGroups().subscribe((res) => {
      this.groups = res;
      this.initSelectedGroup();
    });
  }
  ngOnInit(): void {
    this.groupArrays = this.groupArray.groups;
    this.getGroup();
  }
  initSelectedGroup() {
    this.groups.forEach((x) => {
      const obj = {
        id: x.id,
        name: x.name,
        selected: this.groupArrays.find((y) => y.groupId === x.id) != null,
      };
      this.selectedGroups.push(obj);
    });
  }
  onBack(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.selectedGroups.forEach((x) => {
      if (x.selected === true) {
        this.arrayId.push(x.id);
      }
    });
    this.model = { id: this.groupArray.coachId, groupListId: this.arrayId };
    this.coachService.addCoachToGroup(this.model).subscribe(
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

export class SelectedGroup {
  id: string;
  name: string;
  selected: boolean;
}
export class CoachAddToGroup {
  id: string;
  groupListId: Array<string>;
}
