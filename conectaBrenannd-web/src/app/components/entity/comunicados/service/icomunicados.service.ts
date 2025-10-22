import { Observable } from "rxjs";
import { Comunicados } from "../models/comunicados.models";

export interface IComunicadosService {
  save(request: Comunicados): Observable<Comunicados>;

  update(id: number, request: Comunicados): Observable<Comunicados>;

  delete(id: number): Observable<void>;

  list(): Observable<Comunicados[]>;

  findByID(id: number): Observable<Comunicados>;
}
