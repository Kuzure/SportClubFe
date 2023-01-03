import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitorService } from 'src/app/service/competitor.service';
import { GroupService } from 'src/app/service/group.service';
import { GroupListModel } from './../../../models/group-list.model';
import {
  GroupDetailscompetitorModels,
  GroupDetailsModel,
} from './../../../models/group-details.model';
import { CoachList } from 'src/app/models/coach-list-model';
import { ExerciseListModel } from './../../../models/exercise-list-model';
import { CoachService } from 'src/app/service/coach.service';
import { ExerciseService } from 'src/app/service/exercise.service';
import { GroupCoachesAddComponent } from './../group-coaches-add/group-coaches-add.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupCompetitorAddComponent } from './../group-competitor-add/group-competitor-add.component';
import { GroupExerciseAddComponent } from './../group-exercise-add/group-exercise-add.component';

@Component({
  selector: 'app-group-detial',
  templateUrl: './group-detial.component.html',
  styleUrls: ['./group-detial.component.scss'],
})
export class GroupDetialComponent implements OnInit {
  hide = true;
  isLoginFailed = false;
  errorMessage = '';
  group: GroupDetailsModel;
  competitorList: GroupDetailscompetitorModels[];
  coachList: CoachList[];
  exerciseList: ExerciseListModel[];

  freecompetitorList: GroupDetailscompetitorModels[];
  freecoachList: CoachList[];
  freeexerciseList: ExerciseListModel[];

  displayedColumns: string[] = [
    'idex',
    'firstName',
    'lastName',
    'dateOfBirth',
    'phoneNumber',
    'degree',
    'isPaid',
    'medicalExaminationExpiryDate',
    'button',
    'list',
  ];
  displayedColumns2: string[] = [
    'idex',
    'firstName',
    'lastName',
    'phoneNumber',
    'button',
  ];
  displayedColumns3: string[] = [
    'idex',
    'name',
    'description',
    'repetitions',
    'button',
  ];
  itemsPerPage: number = 5;
  public currentPage = 1;
  totalCount: number;
  maxPage: number;

  itemsPerPage2: number = 5;
  public currentPage2 = 1;
  totalCount2: number;
  maxPage2: number;

  itemsPerPage3: number = 5;
  public currentPage3 = 1;
  totalCount3: number;
  maxPage3: number;

  groupId: string;
  public groupForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.itemsPerPage = e.pageSize;
  }
  public handlePage2(e: any) {
    this.currentPage2 = e.pageIndex + 1;
    this.itemsPerPage2 = e.pageSize;
  }
  public handlePage3(e: any) {
    this.currentPage3 = e.pageIndex + 1;
    this.itemsPerPage3 = e.pageSize;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private competitorService: CompetitorService,
    private coachService: CoachService,
    private exerciseService: ExerciseService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.groupId = String(routeParams.get('id'));
    this.getGroup(this.groupId);
  }
  getGroup(groupId: string) {
    this.groupService.getGroup(groupId).subscribe((res) => {
      this.group = res;
      this.iniFormGroup();
      this.competitorList = res?.competitorModels;
      this.coachList = res?.coachListModels;
      this.exerciseList = res?.exerciseListModels;
      this.totalCount2 = this.coachList?.length;
      this.totalCount = this.competitorList?.length;
      this.totalCount3 = this.exerciseList?.length;
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
  coachData(coachId: string) {
    this.router.navigate(['/coach', coachId]);
  }
  competitorData(competitorId: string) {
    this.router.navigate(['/competitor', competitorId]);
  }
  disconectFromGroup(competitorId: string) {
    this.competitorService.disconnet(competitorId).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {}
    );
  }
  disconectFromGroupCoach(coachid: string) {
    this.coachService.disconnet(coachid).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {}
    );
  }
  disconectFromGroupExercise(exerciseId: string) {
    this.exerciseService.disconnet(exerciseId).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {}
    );
  }
  addCoachesToGroup() {
    this.dialog.open(GroupCoachesAddComponent, {
      data: {
        groupId: this.groupId,
      },
    });
  }
  addCompetitorsToGroup() {
    this.dialog.open(GroupCompetitorAddComponent, {
      data: {
        groupId: this.groupId,
      },
    });
  }
  addExercisesToGroup() {
    this.dialog.open(GroupExerciseAddComponent, {
      data: {
        groupId: this.groupId,
      },
    });
  }
}
