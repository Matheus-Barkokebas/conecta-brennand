import { Usuario } from "../../usuario/models/usuario.models";

export enum TipoGrupo {
    AMIGOS = 'AMIGOS',
    ESCOLAR = 'ESCOLAR',
    INSTITUCIONAL = 'INSTITUCIONAL',
    OUTROS = 'OUTROS'
}

export class Grupo {
  id: number = 0;
  nome: string = "";
  tipoGrupo: TipoGrupo = TipoGrupo.AMIGOS;
  usuario: Usuario = new Usuario();
}
