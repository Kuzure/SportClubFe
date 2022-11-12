import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitorAdd } from '../models/competitor-add-model';
import { ResultModel } from '../models/result-model';
import { GroupListModel } from './../models/group-list.model';

export interface GroupListResult {
  result: Array<GroupListModel>;
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
export class GroupService {
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('Token')!;
  }
  getGroupList(
    page: number,
    itemsPerPage: number
  ): Observable<GroupListResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<GroupListResult>(
      `https://localhost:44388/api/group/pageable?Page=${page}&ItemsPerPage=${itemsPerPage}`,
      { headers: headers }
    );
  }
  addCompetitor(competitor: CompetitorAdd) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/group/add`,
      competitor,
      { headers }
    );
  }
}
