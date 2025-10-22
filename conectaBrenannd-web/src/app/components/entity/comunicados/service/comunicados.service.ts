import { Injectable } from "@angular/core";
import { IComunicadosService } from "./icomunicados.service";
import { environment } from "../../../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Comunicados } from "../models/comunicados.models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ComunicadosService implements IComunicadosService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: Comunicados): Observable<Comunicados> {
    return this.http.post<Comunicados>(`${this.basePath}comunicados`, request);
  }

  update(id: number, request: Comunicados): Observable<Comunicados> {
    return this.http.put<Comunicados>(`${this.basePath}comunicados/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}comunicados/${id}`);
  }

  list(): Observable<Comunicados[]> {
    return this.http.get<Comunicados[]>(`${this.basePath}comunicados`);
  }

  findByID(id: number): Observable<Comunicados> {
    return this.http.get<Comunicados>(`${this.basePath}comunicados/${id}`);
  }
}
