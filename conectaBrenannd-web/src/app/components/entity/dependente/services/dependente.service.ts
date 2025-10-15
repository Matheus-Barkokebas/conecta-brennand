import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDependenteService } from './idependente.service';
import { Dependente } from '../models/dependente.models';

@Injectable({
  providedIn: 'root',
})
export class DependenteService implements IDependenteService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Dependente): Observable<Dependente> {
    return this.http.post<Dependente>(`${this.basePath}dependentes`, request);
  }

  update(id: number, request: Dependente): Observable<Dependente> {
    return this.http.put<Dependente>(`${this.basePath}dependentes/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}dependentes/${id}`);
  }

  list(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.basePath}dependentes`);
  }

  findByID(id: number): Observable<Dependente> {
    return this.http.get<Dependente>(`${this.basePath}dependentes/${id}`);
  }

  listByUser(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.basePath}dependentes/meus`);
  }

  /*
  findMyDependenteById(id: number): Observable<Dependente> {
    return this.http.get<Dependente>(`${this.basePath}dependentes/meus/${id}`);
  }
  */
}
