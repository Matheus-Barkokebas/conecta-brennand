package com.conecta.brenannd.controller.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComunicadosDto {

	private Long id;
	private String titulo;
	private String descricao;
	private LocalDate dataPostagem;
	private Long usuarioId;

}
