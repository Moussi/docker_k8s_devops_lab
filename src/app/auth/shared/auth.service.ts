import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData)
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).pipe(map(
      (token) =>  this.saveToken(token)));
  }

  private saveToken(token): String {
    localStorage.setItem("karya_auth", token)
    return token;
  }
}
