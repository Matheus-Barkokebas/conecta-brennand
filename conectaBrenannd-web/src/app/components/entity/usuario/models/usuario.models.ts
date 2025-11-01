export enum Permissoes {
  ADMIN = 'ADMIN',
  RECEPCIONISTA = 'RECEPCIONISTA',
  USUARIO = 'USUARIO',
}

export class Usuario {
  id: number = 0;
  nome: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';
  cpf: string = '';
  dataNascimento: Date = new Date();
  endereco: string = '';
  cidade: string = '';
  estado: string = '';
  cep: string = '';
  permissao: Permissoes = Permissoes.USUARIO;
}
