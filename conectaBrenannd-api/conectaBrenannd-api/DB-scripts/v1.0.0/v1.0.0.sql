-- Criação do Banco
CREATE DATABASE conectaBrenannd;

---------------------------------------------------------

CREATE TABLE tb_usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(9),
    permissao VARCHAR(50) DEFAULT 'VISITANTE'
);