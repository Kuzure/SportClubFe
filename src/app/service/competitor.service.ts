import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/result-model';
import { CompetitorList } from './../models/competitorList-model';
import { CompetitorAdd } from './../models/competitor-add-model';
import { CompetitorGroupAdd } from './../models/competitor-group-add';

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
  delete(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.delete<ResultModel>(
      `https://localhost:44388/api/competitor?id=${id}`,
      {
        headers,
      }
    );
  }
  disconnet(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/competitor/disconnectedCompetitorFromGroup?id=${id}`,
      {},
      {
        headers,
      }
    );
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
      `https://localhost:44388/api/competitor/pageable?Page=${page}&ItemsPerPage=${itemsPerPage}`,
      { headers: headers }
    );
  }
  addCompetitor(competitor: CompetitorAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/competitor/add`,
      competitor,
      { headers }
    );
  }
  addGroupForCompetitor(competitor: CompetitorGroupAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/competitor/addToGroup`,
      competitor,
      { headers }
    );
  }
  getCompetitor(competitorId: string): Observable<CompetitorList> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<CompetitorList>(
      `https://localhost:44388/api/competitor?id=${competitorId}`,
      { headers: headers }
    );
  }
  updateCompetitor(competitor: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/competitor`,
      competitor,
      { headers }
    );
  }
}
