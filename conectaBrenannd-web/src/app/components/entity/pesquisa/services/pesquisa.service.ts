import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { IPesquisaService } from './ipesquisa.service';
import { HttpClient } from '@angular/common/http';
import { Pesquisa } from '../models/pesquisa.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PesquisaService implements IPesquisaService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Pesquisa): Observable<Pesquisa> {
    return this.http.post<Pesquisa>(`${this.basePath}pesquisas`, request);
  }

  findByID(id: number): Observable<Pesquisa> {
    return this.http.get<Pesquisa>(`${this.basePath}pesquisas/${id}`);
  }
}
