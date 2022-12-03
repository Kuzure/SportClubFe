import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoachAddToGroup } from '../components/coach/coach-add-to-group/coach-add-to-group.component';
import { CoachAdd } from '../models/coach-add-model';
import { CoachList } from '../models/coach-list-model';
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
}
