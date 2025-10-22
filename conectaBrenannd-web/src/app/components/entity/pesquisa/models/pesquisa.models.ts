import { Usuario } from '../../usuario/models/usuario.models';

export class Pesquisa {
  id: number = 0;
  descricao: string = '';
  estrelas: number = 0;
  usuario: Usuario = new Usuario();
}
