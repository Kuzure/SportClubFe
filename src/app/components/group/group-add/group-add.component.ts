import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegisteryUser } from 'src/app/models/user-register-model';
import { CompetitorService } from 'src/app/service/competitor.service';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
})
export class GroupAddComponent implements OnInit {
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ruter: Router,
    private groupService: GroupService
  ) {
    this.dateAdapter.setLocale('pl-PL');
  }

  private usermodel: any;
  hide = true;
  isLoginFailed = false;
  errorMessage = '';

  public addGroupForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  public onSubmit() {
    // TODO: Use EventEmitter with form value
    if (!this.addGroupForm.invalid) {

      const value = JSON.stringify(this.addGroupForm.value);
      this.usermodel = JSON.parse(value);
      this.groupService.addGroup(this.usermodel).subscribe(
        () => {
          this.ruter.navigate(['/group']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  public onBack() {
    this.ruter.navigate(['/competitor']);
  }
  getErrorMessage(field: string) {
    if (this.addGroupForm?.get(field)?.hasError('required')) {
      return 'wprowadź dane';
    }
    return;
  }
}
