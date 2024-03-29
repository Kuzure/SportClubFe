import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitorAdd } from '../models/competitor-add-model';
import { ResultModel } from '../models/result-model';
import { GroupListModel } from './../models/group-list.model';
import { GroupDetailsModel } from './../models/group-details.model';

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
  getGroups(): Observable<Array<GroupListModel>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<Array<GroupListModel>>(
      `https://localhost:44388/api/group`,
      {
        headers: headers,
      }
    );
  }
  delete(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.delete<ResultModel>(
      `https://localhost:44388/api/group?id=${id}`,
      {
        headers,
      }
    );
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
  addGroup(group: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.post<ResultModel>(
      `https://localhost:44388/api/group`,
      group,
      { headers }
    );
  }
  getGroup(groupId: string): Observable<GroupDetailsModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.get<GroupDetailsModel>(
      `https://localhost:44388/api/group/id?id=${groupId}`,
      { headers: headers }
    );
  }
  updateGroup(group: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.currentUser,
    });

    return this.http.put<ResultModel>(
      `https://localhost:44388/api/group`,
      group,
      { headers }
    );
  }
}
