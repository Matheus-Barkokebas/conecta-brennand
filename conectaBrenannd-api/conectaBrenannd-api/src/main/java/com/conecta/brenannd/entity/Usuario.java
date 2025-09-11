package com.conecta.brenannd.entity;

import java.time.LocalDate;

import com.conecta.brenannd.entity.enums.Permissao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_usuarios")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario", nullable = false, unique = true)
	private Long id;

	@Column(name = "nome_completo", nullable = false, length = 150)
	private String nome;

	@Column(name = "email", nullable = false, unique = true, length = 120)
	private String email;

	@Column(name = "senha", nullable = false, length = 255)
	private String senha;

	@Column(name = "telefone", length = 20)
	private String telefone;

	@Column(name = "cpf", unique = true, length = 14)
	private String cpf;

	@Column(name = "data_nascimento")
	private LocalDate dataNascimento;

	@Column(name = "endereco", length = 255)
	private String endereco;

	@Column(name = "cidade", length = 100)
	private String cidade;

	@Column(name = "estado", length = 2)
	private String estado;

	@Column(name = "cep", length = 9)
	private String cep;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "permissao")
	private Permissao permissao = Permissao.VISITANTE;

}
