import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachList } from 'src/app/models/coach-list-model';
import { CoachService } from 'src/app/service/coach.service';

@Component({
  selector: 'app-coach-groups',
  templateUrl: './coach-groups.component.html',
  styleUrls: ['./coach-groups.component.scss'],
})
export class CoachGroupsComponent implements OnInit {
  displayedColumns: string[] = [
    'idex',
    'firstName',
    'lastName',
    'phoneNumber',
    'groups',
    'button',
  ];
  coachList: CoachList[];
  itemsPerPage: number = 5;
  public currentPage = 1;
  totalCount: number;
  maxPage: number;
  addData() {
    this.router.navigate(['coach/add']);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.itemsPerPage = e.pageSize;

    this.getPageableGroup();
  }
  getPageableGroup() {
    this.coachService
      .getCoachList(this.currentPage, this.itemsPerPage)
      .subscribe((res) => {
        this.coachList = res.result;
        this.totalCount = res.totalCount;
        this.maxPage = res.totalPages;
        this.currentPage = res.currentPage;
      });
  }
  coachData(coachId: string) {
    this.router.navigate(['/coach', coachId]);
  }
  removeData() {}
  constructor(private coachService: CoachService, private router: Router) {}

  ngOnInit(): void {
    this.getPageableGroup();
  }
}
