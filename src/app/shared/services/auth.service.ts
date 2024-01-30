import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token_jwt';

  token: string | null = localStorage.getItem('token_jwt');

  userNameToken!: BehaviorSubject<string>;

  constructor(){

  }

  getToken(): string | null {
    return localStorage.getItem('token_jwt');
  }

  getUserName(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || decodedToken.username || null;
    } catch (error) {
      return null;
    }
  }
  
  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) {
      return true;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const dataExpiracao = new Date(decodedToken.exp * 1000);
      return dataExpiracao < new Date();
    } catch (error) {
      return true;
    }
  }
  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}