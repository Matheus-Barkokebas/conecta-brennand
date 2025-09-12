export enum Permissoes {
  ADMIN = 'ADMIN',
  RECEPCIONISTA = 'RECEPCIONISTA',
  USUARIO = 'USUARIO',
}

export class Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  dataNascimento: Date;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  permissao: Permissoes;

  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    cpf: string,
    dataNascimento: Date,
    endereco: string,
    cidade: string,
    estado: string,
    cep: string,
    permissao: Permissoes
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.permissao = permissao;
  }
}
