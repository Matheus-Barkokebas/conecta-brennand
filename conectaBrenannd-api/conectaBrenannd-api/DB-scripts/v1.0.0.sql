-- Criação do Banco
CREATE DATABASE conectaBrenannd;
\c conectaBrenannd;

---------------------------------------------------------

CREATE TABLE visitante (
    id_visitante SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT,
    tipo VARCHAR(50) CHECK (tipo IN ('individual', 'grupo'))
);


CREATE TABLE agendamento (
    id_agendamento SERIAL PRIMARY KEY,
    id_visitante INT NOT NULL,
    data_visita DATE NOT NULL,
    hora_visita TIME NOT NULL,
    qtd_pessoas INT DEFAULT 1,
    status VARCHAR(20) CHECK (status IN ('pendente', 'confirmado', 'cancelado')) DEFAULT 'pendente'
);


CREATE TABLE participante (
    id_participante SERIAL PRIMARY KEY,
    id_agendamento INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    documento VARCHAR(20)
);


CREATE TABLE token (
    id_token SERIAL PRIMARY KEY,
    id_agendamento INT NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('ativo', 'usado', 'expirado', 'revogado')) DEFAULT 'ativo',
    data_emissao TIMESTAMP DEFAULT NOW(),
    data_expiracao TIMESTAMP
);


CREATE TABLE feedback (
    id_feedback SERIAL PRIMARY KEY,
    id_agendamento INT NOT NULL,
    nota INT CHECK (nota BETWEEN 0 AND 10),
    comentario TEXT,
    data_feedback TIMESTAMP DEFAULT NOW()
);


CREATE TABLE administrador (
    id_admin SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash VARCHAR(200) NOT NULL,
    papel VARCHAR(50) CHECK (papel IN ('gestor', 'recepcao')) DEFAULT 'recepcao',
    data_criacao TIMESTAMP DEFAULT NOW()
);

---------------------------------------------------------

-- um agendamento pertence a um visitante (1/1).
ALTER TABLE agendamento
ADD CONSTRAINT fk_agendamento_visitante
FOREIGN KEY (id_visitante) REFERENCES visitante(id_visitante)
ON DELETE CASCADE;

-- cada participante de grupo está vinculado a um agendamento específico (1/1).
ALTER TABLE participante
ADD CONSTRAINT fk_participante_agendamento
FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento)
ON DELETE CASCADE;

-- cada token é gerado para um agendamento (entrada/validação no parque (1/1)).
ALTER TABLE token
ADD CONSTRAINT fk_token_agendamento
FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento)
ON DELETE CASCADE;

-- cada feedback está associado a um agendamento (avaliação da visita (1/1)).
ALTER TABLE feedback
ADD CONSTRAINT fk_feedback_agendamento
FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento)
ON DELETE CASCADE;
