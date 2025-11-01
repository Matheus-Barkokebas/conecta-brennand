package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Comunicados;

public interface IComunicadosQueryService {

	Comunicados findById(final long id);

	List<Comunicados> list();

}
