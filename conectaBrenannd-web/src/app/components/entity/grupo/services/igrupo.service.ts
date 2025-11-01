import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo.models';

export interface IGrupoService {
  save(request: Grupo): Observable<Grupo>;

  update(id: number, request: Grupo): Observable<Grupo>;

  delete(id: number): Observable<void>;

  list(): Observable<Grupo[]>;

  findByID(id: number): Observable<Grupo>;

  listByUser(): Observable<Grupo[]>;
}
