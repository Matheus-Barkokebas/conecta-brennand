package com.conecta.brenannd.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PesquisaDto {

	private Long id;
	private String descricao;
	private Integer estrelas;
	private Long usuarioId;

}
