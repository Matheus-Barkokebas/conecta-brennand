package com.conecta.brenannd.service;

import com.conecta.brenannd.controller.dto.ValidacaoIngressoResponseDTO;
import com.conecta.brenannd.entity.Ingresso;

public interface IIngressoService {

	Ingresso save(final Ingresso entity);
	
	ValidacaoIngressoResponseDTO validarIngresso(String cpfToken);
	
	Ingresso update(final long id, final Ingresso entity);
	
	void delete(final long id);
}
