-- Criação do Banco
--CREATE DATABASE conectaBrenannd;

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

CREATE TABLE tb_ingressos (
    id_ingresso BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT,
    cpf_token VARCHAR(14) NOT NULL,
    tipo_ingresso VARCHAR(50) DEFAULT 'Gratuito',
    status VARCHAR(20) DEFAULT 'ATIVO' CHECK (status IN ('ATIVO','USADO','CANCELADO','BLOQUEADO')),
    data_emissao TIMESTAMP WITH TIME ZONE DEFAULT now(),
    data_utilizacao TIMESTAMP WITH TIME ZONE
);

---------------------------------------------------------

ALTER TABLE tb_ingressos
ADD CONSTRAINT fk_ingresso_usuario
FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
ON DELETE SET NULL;
