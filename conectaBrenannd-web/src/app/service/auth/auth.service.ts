import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface LoginDto {
  email: string;
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userRole = new BehaviorSubject<string | null>(this.getUserRole());

  isLoggedIn$ = this.loggedIn.asObservable();
  userRole$ = this.userRole.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginDto) {
    return this.http.post<{usuarioLogado: string}>(this.loginUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('usuarioLogado', JSON.stringify(response));
        this.loggedIn.next(true);
        const permissao = this.getUserData()?.permissao ?? null;
        this.userRole.next(permissao);
      })
    );
  }

  getToken(): string | null {
    return this.getUserData()?.token ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getUserData();
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.loggedIn.next(false);
    this.userRole.next(null);
  }

  getUserRole(): string | null {
    return this.getUserData()?.permissao ?? null;
  }

  getUserData(): any | null {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }
}
