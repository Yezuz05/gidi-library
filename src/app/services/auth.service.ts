import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).user;
    }
    return null;
  }

  getToken() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).token;
    }
    return null;
  }

  login(data: any) {
    return this.http.post(`${environment.authBaseUrl}/login`, data);
  }
}
