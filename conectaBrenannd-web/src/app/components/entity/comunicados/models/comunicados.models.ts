import { Usuario } from "../../usuario/models/usuario.models";

export class Comunicados {
  id: number = 0;
  titulo: string = '';
  descricao: string = '';
  dataPostagem: Date = new Date();
  usuario: Usuario = new Usuario();
}
