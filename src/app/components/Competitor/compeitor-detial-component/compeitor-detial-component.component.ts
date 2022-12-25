import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitorService } from 'src/app/service/competitor.service';
import { CompetitorList } from './../../../models/competitorList-model';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-compeitor-detial-component',
  templateUrl: './compeitor-detial-component.component.html',
  styleUrls: ['./compeitor-detial-component.component.scss'],
})
export class CompeitorDetialComponentComponent implements OnInit {
  hide = true;
  isLoginFailed = false;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private competitorService: CompetitorService,
    private location: Location,
    private groupService: GroupService
  ) {}
  groups: Array<GroupListModel>;
  competitor: CompetitorList;
  public addCompetitorForm = new FormGroup({
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
    degree: new FormControl('', Validators.required),
    medicalExaminationExpiryDate: new FormControl('', Validators.required),
    isPaid: new FormControl(false, Validators.required),
    groupId: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let competitorId = String(routeParams.get('id'));
    this.getCompetitor(competitorId);
    this.getGroups();
  }
  getCompetitor(competitorId: string) {
    this.competitorService.getCompetitor(competitorId).subscribe((res) => {
      this.competitor = res;
      this.iniFormGroup();
    });
  }
  getGroups() {
    this.groupService.getGroups().subscribe((res) => {
      this.groups = res;
    });
  }
  iniFormGroup() {
    this.addCompetitorForm.setValue({
      id: this.competitor.id,
      firstName: this.competitor.firstName,
      lastName: this.competitor.lastName,
      dateOfBirth: this.competitor.dateOfBirth,
      phoneNumber: this.competitor.phoneNumber,
      gender: this.competitor.gender,
      degree: this.competitor.degree,
      medicalExaminationExpiryDate:
        this.competitor.medicalExaminationExpiryDate,
        isPaid: this.competitor.isPaid,
      groupId: this.competitor.groupId,
    });
  }
  getErrorMessage(field: string) {
    if (this.addCompetitorForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
  public onSubmit() {
    this.addCompetitorForm.controls['gender'].value == 'Mężczyzna'
      ? this.addCompetitorForm.controls['gender'].setValue('Male')
      : this.addCompetitorForm.controls['gender'].setValue('Female');
    const value = JSON.stringify(this.addCompetitorForm.value);
    let x = JSON.parse(value);
    this.competitorService.updateCompetitor(x).subscribe(
      () => {
        this.location.back();
      },
      (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    );
  }
  public onBack() {
    this.location.back();
  }
}
