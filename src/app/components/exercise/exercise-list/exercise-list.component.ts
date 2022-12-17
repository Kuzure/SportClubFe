import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExerciseListModel } from 'src/app/models/exercise-list-model';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {
  displayedColumns: string[] = ['idex', 'name', 'description', 'button'];
  exerciseList: ExerciseListModel[];
  itemsPerPage: number = 5;
  public currentPage = 1;
  totalCount: number;
  maxPage: number;
  addData() {
    this.router.navigate(['exercise/add']);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex + 1;
    this.itemsPerPage = e.pageSize;

    this.getPageableExercise();
  }
  getPageableExercise() {
    this.exerciseService
      .getExerciseList(this.currentPage, this.itemsPerPage)
      .subscribe((res) => {
        this.exerciseList = res.result;
        this.totalCount = res.totalCount;
        this.maxPage = res.totalPages;
        this.currentPage = res.currentPage;
      });
  }
  addExerciseToGroup(competitorId: string) {}
  exerciseData(exerciseId: string) {
    this.router.navigate(['/exercise', exerciseId]);
  }
  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPageableExercise();
  }
}
