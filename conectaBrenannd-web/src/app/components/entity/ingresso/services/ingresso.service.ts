import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingresso } from '../models/ingresso.models';
import { environment } from '../../../../../environment/environment';
import { IIngressoService } from './iingresso.service';

@Injectable({
  providedIn: 'root',
})
export class IngressoService implements IIngressoService{
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Ingresso): Observable<Ingresso> {
    return this.http.post<Ingresso>(`${this.basePath}ingressos`, request);
  }

  update(id: number, request: Ingresso): Observable<Ingresso> {
    return this.http.put<Ingresso>(`${this.basePath}ingressos/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}ingressos/${id}`);
  }

  list(): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(`${this.basePath}ingressos`);
  }

  findByID(id: number): Observable<Ingresso> {
    return this.http.get<Ingresso>(`${this.basePath}ingressos/${id}`);
  }

  findByCPF(cpf: string): Observable<Ingresso[]> {
    return this.http.get<Ingresso[]>(`${this.basePath}ingressos/cpf/${cpf}`);
  }
}
