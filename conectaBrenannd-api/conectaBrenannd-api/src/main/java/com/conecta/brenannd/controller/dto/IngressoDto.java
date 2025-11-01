package com.conecta.brenannd.controller.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.conecta.brenannd.entity.enums.StatusIngresso;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngressoDto {

	private Long id;
	private Long usuarioId;
	private String cpfToken;
	private String tipoIngresso;
	private StatusIngresso status;
	private LocalDateTime dataEmissao;
	private LocalDate dataUtilizacao;
}
