import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ExerciseListModel,
  ExerciseModel,
} from '../models/exercise-list-model';
import { ResultModel } from '../models/result-model';

export interface ExerciseListResult {
  result: Array<ExerciseListModel>;
  code: number;
  message: string;
  isError: boolean;
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('Token')!;
  }
  delete(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.delete<ResultModel>(
      `https://localhost:44388/api/exercise?id=${id}`,
      {
        headers,
      }
    );
  }
  getExerciseList(
    page: number,
    itemsPerPage: number
  ): Observable<ExerciseListResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<ExerciseListResult>(
      `https://localhost:44388/api/exercise/pageable?Page=${page}&ItemsPerPage=${itemsPerPage}`,
      { headers: headers }
    );
  }
  addExercise(exercise: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/exercise`,
      exercise,
      { headers }
    );
  }
  getExercise(exerciseId: string): Observable<ExerciseModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<ExerciseModel>(
      `https://localhost:44388/api/exercise?id=${exerciseId}`,
      { headers: headers }
    );
  }
  updateExercise(exercise: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/exercise`,
      exercise,
      { headers }
    );
  }
  disconnet(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/exercise/disconnectedExerciseFromGroup?id=${id}`,
      {},
      {
        headers,
      }
    );
  }
}
