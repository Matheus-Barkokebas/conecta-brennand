import { Usuario } from '../../usuario/models/usuario.models';

export enum StatusIngresso {
  ATIVO = 'ATIVO',
  INATIVO = 'USADO',
  UTILIZADO = 'CANCELADO',
}

export interface ValidacaoIngressoResponse {
  mensagem: string;
  status: StatusIngresso;
  dataUtilizacao: string | null;
}

export class Ingresso {
  id: number = 0;
  usuario: Usuario = new Usuario();
  cpfToken: string = '';
  tipoIngresso: string = '';
  status: StatusIngresso = StatusIngresso.ATIVO;
  dataEmissao: Date = new Date();
  dataUtilizacao: Date = new Date();
}
