package com.conecta.brenannd.service;

import com.conecta.brenannd.entity.Comunicados;

public interface IComunicadosService {

	Comunicados save(final Comunicados entity);
	
	Comunicados update(final long id, final Comunicados entity);
	
	void delete(final long id);
}
