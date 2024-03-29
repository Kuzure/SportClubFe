import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoachAddToGroup } from '../components/coach/coach-add-to-group/coach-add-to-group.component';
import { CoachesAddToGroup } from '../components/group/group-coaches-add/group-coaches-add.component';
import { CoachAdd } from '../models/coach-add-model';
import { CoachList, CoachUpdate } from '../models/coach-list-model';
import { ResultModel } from '../models/result-model';

export interface CoachListResult {
  result: Array<CoachList>;
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
export class CoachService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('Token')!;
  }
  getCoachList(
    page: number,
    itemsPerPage: number
  ): Observable<CoachListResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<CoachListResult>(
      `https://localhost:44388/api/coach/pageable?Page=${page}&ItemsPerPage=${itemsPerPage}`,
      { headers: headers }
    );
  }
  addCoach(coach: CoachAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/coach`,
      coach,
      { headers }
    );
  }
  addCoachToGroup(coachGroups: CoachAddToGroup) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/coach/addToGroup`,
      coachGroups,
      { headers }
    );
  }
  deleteCoach(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.delete<ResultModel>(
      `https://localhost:44388/api/coach?id=${id}`,
      {
        headers,
      }
    );
  }
  getCoach(coachId: string): Observable<CoachUpdate> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<CoachUpdate>(
      `https://localhost:44388/api/coach?id=${coachId}`,
      { headers: headers }
    );
  }
  updateCoach(coach: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/coach`,
      coach,
      { headers }
    );
  }
  disconnet(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/coach/disconnectedCoachFromGroup?id=${id}`,
      {},
      {
        headers,
      }
    );
  }
  getFreeCoach(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<CoachList[]>(
      `https://localhost:44388/api/coach/all?GroupId=${id}`,
      { headers: headers }
    );
  }
  addCoachesToGroup(coachesGroups: CoachesAddToGroup) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/coach/addCoachesToGroup`,
      coachesGroups,
      { headers }
    );
  }
}
