import { Component, OnInit, ViewChild } from '@angular/core';
import { CompetitorList } from 'src/app/models/competitorList-model';
import { CompetitorService } from 'src/app/service/competitor.service';
import { Router } from '@angular/router';

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
  itemsPerPage: number = 5;
  public currentPage = 1;
  totalCount: number;
  maxPage: number;
  addData() {
    this.router.navigate(['competitor/add']);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.itemsPerPage = e.pageSize;

    this.getPageableCompetitor();
  }
  getPageableCompetitor() {
    this.competitorService
      .getCompetitorList(this.currentPage, this.itemsPerPage)
      .subscribe((res) => {
        this.competitorList = res.result;
        this.totalCount = res.totalCount;
        this.maxPage = res.totalPages;
        this.currentPage = res.currentPage;
      });
  }
  removeData() {}
  constructor(
    private competitorService: CompetitorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPageableCompetitor();
  }
}
