package com.conecta.brenannd.service;

import com.conecta.brenannd.entity.Grupo;

public interface IGrupoService {
	
	Grupo save(final Grupo entity);
	
	Grupo update(final long id, final Grupo entity);
	
	void delete(final long id);

}
