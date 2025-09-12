import { Injectable } from '@angular/core';
import { IUsuarioService } from './iusuario.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from '../models/usuario.models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements IUsuarioService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: UsuarioDto): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(`${this.basePath}usuarios`, request);
  }
  update(id: number, request: UsuarioDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.basePath}usuarios/${id}`, request);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}usuarios/${id}`);
  }
  list(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${this.basePath}usuarios`);
  }
  findByID(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.basePath}usuarios/${id}`);
  }
  findByCPF(cpf: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.basePath}usuarios/${cpf}`);
  }
}
