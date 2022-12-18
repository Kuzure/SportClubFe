import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoachGroupList, CoachList } from 'src/app/models/coach-list-model';
import { CoachService } from 'src/app/service/coach.service';
import { CoachAddToGroupComponent } from './../coach-add-to-group/coach-add-to-group.component';

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
  addCoachToGroup(groups: Array<CoachGroupList>, coachId: string) {
    this.dialog.open(CoachAddToGroupComponent, {
      data: {
        groups,
        coachId,
      },
    });
  }
  deleteCoach(id: string) {
    this.coachService.deleteCoach(id).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {
      }
    );
  }
  removeData() {}
  constructor(
    private coachService: CoachService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPageableGroup();
  }
}
