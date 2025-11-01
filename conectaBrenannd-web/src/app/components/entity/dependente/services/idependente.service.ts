import { Observable } from 'rxjs';
import { Dependente } from '../models/dependente.models';

export interface IDependenteService {
  save(request: Dependente): Observable<Dependente>;

  update(id: number, request: Dependente): Observable<Dependente>;

  delete(id: number): Observable<void>;

  list(): Observable<Dependente[]>;

  findByID(id: number): Observable<Dependente>;

  listByUser(): Observable<Dependente[]>;
}
