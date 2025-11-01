package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Dependente;

public interface IDependenteQueryService {

	Dependente findById(final long id);

	List<Dependente> list();

	List<Dependente> listByUser();

}
