import { Grupo } from "../../grupo/models/grupo.models";
import { Usuario } from "../../usuario/models/usuario.models";

export class Dependente {
  id: number = 0;
  nome: string = "";
  idade: number = 0;
  parentesco: string = "";
  cpf: string = "";
  grupo: Grupo = new Grupo();
  usuario: Usuario = new Usuario();
}
