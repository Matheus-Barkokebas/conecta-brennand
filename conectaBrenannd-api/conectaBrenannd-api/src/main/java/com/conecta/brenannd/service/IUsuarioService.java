package com.conecta.brenannd.service;

import com.conecta.brenannd.entity.Usuario;

public interface IUsuarioService {
	
	Usuario save(final Usuario entity);
	
	Usuario update(final long id, final Usuario entity);
	
	void delete(final long id);

}
