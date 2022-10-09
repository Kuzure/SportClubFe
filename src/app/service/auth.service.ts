import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { ResultModel } from '../models/result-model';
import { RegisteryUser } from '../models/user-register-model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('Token')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<ResultModel>(`https://localhost:44388/api/user/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          if (!user.isError) {
            return user.result;
          }
          return '';
        })
      );
  }
  register(user: RegisteryUser) {
    return this.http.post<ResultModel>(
      `https://localhost:44388/api/user/register`,
      user
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('Token');
    this.currentUserSubject.next(null!);
  }
}
