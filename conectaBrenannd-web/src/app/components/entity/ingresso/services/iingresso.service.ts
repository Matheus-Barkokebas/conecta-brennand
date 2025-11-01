import { Observable } from 'rxjs';
import { Ingresso, ValidacaoIngressoResponse } from '../models/ingresso.models';

export interface IIngressoService {
  save(request: Ingresso): Observable<Ingresso>;

  update(id: number, request: Ingresso): Observable<Ingresso>;

  delete(id: number): Observable<void>;

  list(): Observable<Ingresso[]>;

  findByID(id: number): Observable<Ingresso>;

  findByCPF(cpf: string): Observable<Ingresso[]>;

  listByUser(): Observable<Ingresso[]>;

  findMyIngressoById(id: number): Observable<Ingresso>;

  validarIngresso(cpfToken: string): Observable<ValidacaoIngressoResponse>;
}
