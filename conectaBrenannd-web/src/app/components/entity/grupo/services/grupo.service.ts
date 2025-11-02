import { Injectable } from '@angular/core';
import { IGrupoService } from './igrupo.service';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo.models';

@Injectable({
  providedIn: 'root',
})
export class GrupoService implements IGrupoService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.basePath}grupos`, request);
  }

  update(id: number, request: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.basePath}grupos/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}grupos/${id}`);
  }

  list(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.basePath}grupos`);
  }

  findByID(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.basePath}grupos/${id}`);
  }

  listByUser(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.basePath}grupos/meus`);
  }
}
