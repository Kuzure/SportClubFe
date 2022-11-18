import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitorService } from 'src/app/service/competitor.service';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';

@Component({
  selector: 'app-group-detial',
  templateUrl: './group-detial.component.html',
  styleUrls: ['./group-detial.component.scss'],
})
export class GroupDetialComponent implements OnInit {
  hide = true;
  isLoginFailed = false;
  errorMessage = '';
  group: GroupListModel;

  public groupForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let groupId = String(routeParams.get('id'));
    this.getGroup(groupId);
  }
  getGroup(groupId: string) {
    this.groupService.getGroup(groupId).subscribe((res) => {
      this.group = res;
      this.iniFormGroup();
    });
  }
  iniFormGroup() {
    this.groupForm.setValue({
      id: this.group.id,
      name: this.group.name,
    });
  }
  getErrorMessage(field: string) {
    if (this.groupForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
  public onSubmit() {
    const value = JSON.stringify(this.groupForm.value);
    let x = JSON.parse(value);
    this.groupService.updateGroup(x).subscribe(
      () => {
        this.router.navigate(['/group']);
      },
      (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    );
  }
  public onBack() {
    this.router.navigate(['/group']);
  }
}
