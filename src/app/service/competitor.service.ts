import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { ResultModel } from '../models/result-model';
import { User } from '../models/user';
import { CompetitorList } from './../models/competitorList-model';

export interface CompetitorListResult {
  result: Array<CompetitorList>;
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
export class CompetitorService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('Token')!;
  }
  getCompetitorList(
    page: number,
    itemsPerPage: number
  ): Observable<CompetitorListResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<CompetitorListResult>(
      `https://localhost:44388/api/Competitor/pageable?Page=${page}&ItemsPerPage=${itemsPerPage}`,
      { headers: headers }
    );
  }
}