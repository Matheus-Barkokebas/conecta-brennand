ALTER TABLE tb_dependentes
ADD COLUMN id_usuario BIGINT NOT NULL;

ALTER TABLE tb_dependentes
ADD CONSTRAINT fk_dependente_usuario 
FOREIGN KEY (id_usuario) 
REFERENCES tb_usuarios(id_usuario);
