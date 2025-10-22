package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Grupo;

public interface IGrupoQueryService {
	
	Grupo findById(final long id);
	
	List<Grupo> list();
	
	List<Grupo> listByUser();

}
