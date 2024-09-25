import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

type TokenBearer = {
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log('Token:', decodedToken);
    return decodedToken.unique_name;
  }
}
