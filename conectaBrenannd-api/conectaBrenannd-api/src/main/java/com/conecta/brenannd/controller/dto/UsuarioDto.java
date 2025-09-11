package com.conecta.brenannd.controller.dto;

import java.time.LocalDate;

import com.conecta.brenannd.entity.enums.Permissao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

	private Long id;
	private String nome;
	private String email;
	private String senha;
	private String telefone;
	private String cpf;
	private LocalDate dataNascimento;
	private String endereco;
	private String cidade;
	private String estado;
	private String cep;
	private Permissao permissao;
}
