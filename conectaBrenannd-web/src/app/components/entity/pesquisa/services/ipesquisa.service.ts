import { Observable } from 'rxjs';
import { Pesquisa } from '../models/pesquisa.models';

export interface IPesquisaService {
  save(request: Pesquisa): Observable<Pesquisa>;

  findByID(id: number): Observable<Pesquisa>;
}
