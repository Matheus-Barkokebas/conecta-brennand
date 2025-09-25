import { Usuario } from "../../usuario/models/usuario.models";

export enum StatusIngresso {
  ATIVO = 'ATIVO',
  INATIVO = 'USADO',
  UTILIZADO = 'CANCELADO'
}

export class Ingresso {
  id: number = 0;
  usuario: Usuario = new Usuario()
  cpfToken: string = "";
  tipoIngresso: string = "";
  status: StatusIngresso = StatusIngresso.ATIVO;
  dataEmissao: Date = new Date();
  dataVisita: Date = new Date();
}
