import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitorService } from 'src/app/service/competitor.service';
import { CompetitorList } from './../../../models/competitorList-model';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';
import { Location } from '@angular/common';
import {
  CompetitorData,
  CompetitorDetailModel,
  GroupData,
  IdentityData,
} from 'src/app/models/competitor-details-model';
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

  competitor: CompetitorList;
  getCompetitor(competitorId: string) {
    this.competitorService.getCompetitor(competitorId).subscribe((res) => {
      const builder = new CreateCompetitorDetail();
      this.competitor = builder.getCompetitorDetail(res);
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
    switch (this.addCompetitorForm.controls['degree'].value) {
      case '1 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu1');
        break;
      case '2 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu2');
        break;
      case '3 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu3');
        break;
      case '4 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu4');
        break;
      case '5 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu5');
        break;
      case '6 Kyu':
        this.addCompetitorForm.controls['degree'].setValue('Kyu6');
        break;
      case '1 Dan':
        this.addCompetitorForm.controls['degree'].setValue('1 Dan');
        break;
      case '2 Dan':
        this.addCompetitorForm.controls['degree'].setValue('2 Dan');
        break;
      case '3 Dan':
        this.addCompetitorForm.controls['degree'].setValue('3 Dan');
        break;
      case '4 Dan':
        this.addCompetitorForm.controls['degree'].setValue('4 Dan');
        break;
    }
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
interface Builder {
  createCompetitor(competitorData: CompetitorData): void;
  createIdentity(identityData: IdentityData): void;
  createGroup(groupData: GroupData): void;
}
class CreateCompetitorDetail implements Builder {
  competitorDetail: CompetitorList;
  constructor() {
    this.competitorDetail = new CompetitorList();
  }

  createCompetitor(competitorData: CompetitorData): void {
    this.competitorDetail.isPaid = competitorData.isPaid;
    this.competitorDetail.id = competitorData.id;
    this.competitorDetail.medicalExaminationExpiryDate =
      competitorData.medicalExaminationExpiryDate;
  }
  createIdentity(identityData: IdentityData): void {
    this.competitorDetail.firstName = identityData.firstName;
    this.competitorDetail.lastName = identityData.lastName;
    this.competitorDetail.dateOfBirth = identityData.dateOfBirth;
    this.competitorDetail.degree = identityData.degree;
    this.competitorDetail.gender = identityData.gender;
    this.competitorDetail.phoneNumber = identityData.phoneNumber;
  }
  createGroup(groupData: GroupData): void {
    this.competitorDetail.groupId = groupData.groupId;
    this.competitorDetail.groupName = groupData.groupName;
  }
  public getCompetitorDetail(data: CompetitorDetailModel): CompetitorList {
    this.createCompetitor(data.competitorData);
    this.createGroup(data.groupData);
    this.createIdentity(data.identityData);
    return this.competitorDetail;
  }
}
