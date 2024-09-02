import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiURL = "http://localhost:3000"

  constructor() { }

  login(data: { email: string, password: string }) {
    return this.http.post(`${this.apiURL}/users/login`, data);
  }

  register(data: { email: string, password: string }) {
    return this.http.post(`${this.apiURL}/users/register`, data);
  }
}
