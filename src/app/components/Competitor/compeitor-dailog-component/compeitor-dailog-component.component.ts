import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompetitorService } from 'src/app/service/competitor.service';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';
import { Router } from '@angular/router';
import { CompetitorGroupAdd } from './../../../models/competitor-group-add';

@Component({
  selector: 'app-compeitor-dailog-component',
  templateUrl: './compeitor-dailog-component.component.html',
  styleUrls: ['./compeitor-dailog-component.component.scss'],
})
export class CompeitorDailogComponentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public competitorId: any,
    private competitorService: CompetitorService,
    private groupService: GroupService,
    public dialogRef: MatDialogRef<CompeitorDailogComponentComponent>,
    private ruter: Router
  ) {
    this.getGroups();
  }

  group: string;
  groups: Array<GroupListModel>;
  model: CompetitorGroupAdd;
  isLoginFailed = false;
  errorMessage = '';

  ngOnInit(): void {}
  getGroups() {
    this.groupService.getGroups().subscribe((res) => {
      this.groups = res;
    });
  }
  onBack(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.model = { id: this.competitorId.competitorId, groupId: this.group };
    this.competitorService.addGroupForCompetitor(this.model).subscribe(
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
