import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CompetitorList } from 'src/app/models/competitorList-model';
import { CompetitorService } from 'src/app/service/competitor.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'idex',
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'gender',
    'degree',
    'is_Paid',
    'medicalExaminationExpiryDate',
    'groupName',
  ];
  competitorList: CompetitorList[];
  lowValue: number = 0;
  highValue: number = 20;

  addData() {}

  removeData() {}
  constructor(private competitorService: CompetitorService) {}

  ngOnInit(): void {
    this.competitorService
      .getCompetitorList()
      .subscribe((res) => (this.competitorList = res.result));
  }
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
