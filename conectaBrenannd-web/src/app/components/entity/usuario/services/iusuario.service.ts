import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';

export interface IUsuarioService {
  save(request: Usuario): Observable<Usuario>;

  update(id: number, request: Usuario): Observable<Usuario>;

  delete(id: number): Observable<void>;

  list(): Observable<Usuario[]>;

  findByID(id: number): Observable<Usuario>;

  findByCPF(cpf: string): Observable<Usuario>;
}
