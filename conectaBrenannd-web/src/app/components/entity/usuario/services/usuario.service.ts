import { Injectable } from '@angular/core';
import { IUsuarioService } from './iusuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements IUsuarioService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.basePath}usuarios`, request);
  }
  update(id: number, request: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.basePath}usuarios/${id}`, request);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}usuarios/${id}`);
  }
  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.basePath}usuarios`);
  }
  findByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.basePath}usuarios/${id}`);
  }
  findByCPF(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.basePath}usuarios/${cpf}`);
  }
}
