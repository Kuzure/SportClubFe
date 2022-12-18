import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  displayedColumns: string[] = ['idex', 'name', 'button'];
  groupList: GroupListModel[];
  itemsPerPage: number = 5;
  public currentPage = 1;
  totalCount: number;
  maxPage: number;
  addData() {
    this.router.navigate(['group/add']);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.itemsPerPage = e.pageSize;

    this.getPageableGroup();
  }
  getPageableGroup() {
    this.groupService
      .getGroupList(this.currentPage, this.itemsPerPage)
      .subscribe((res) => {
        this.groupList = res.result;
        this.totalCount = res.totalCount;
        this.maxPage = res.totalPages;
        this.currentPage = res.currentPage;
      });
  }
  deleteGroup(id: string) {
    this.groupService.delete(id).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {
      }
    );
  }
  groupData(groupId: string) {
    this.router.navigate(['/group', groupId]);
  }
  removeData() {}
  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.getPageableGroup();
  }
}
