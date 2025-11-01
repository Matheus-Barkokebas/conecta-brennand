package com.conecta.brenannd.controller.dto;

import java.time.LocalDate;

import com.conecta.brenannd.entity.enums.StatusIngresso;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ValidacaoIngressoResponseDTO {
	
	private String mensagem;
	private StatusIngresso status;
	private LocalDate dataUtilizacao;
}
