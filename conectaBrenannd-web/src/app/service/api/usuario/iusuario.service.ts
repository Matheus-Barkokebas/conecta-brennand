import { Observable } from 'rxjs';import { UsuarioDto } from './usuario.models';

export interface IUsuarioService {
  save(request: UsuarioDto): Observable<UsuarioDto>;

  update(id: number, request: UsuarioDto): Observable<UsuarioDto>;

  delete(id: number): Observable<void>;

  list(): Observable<UsuarioDto[]>;

  findByID(id: number): Observable<UsuarioDto>;

  findByCPF(cpf: string): Observable<UsuarioDto>;
}
