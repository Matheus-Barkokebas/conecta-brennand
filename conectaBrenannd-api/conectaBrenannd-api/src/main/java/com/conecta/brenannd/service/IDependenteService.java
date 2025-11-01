package com.conecta.brenannd.service;

import com.conecta.brenannd.entity.Dependente;

public interface IDependenteService {

	Dependente save(final Dependente entity);

	Dependente update(final long id, final Dependente entity);

	void delete(final long id);

}
