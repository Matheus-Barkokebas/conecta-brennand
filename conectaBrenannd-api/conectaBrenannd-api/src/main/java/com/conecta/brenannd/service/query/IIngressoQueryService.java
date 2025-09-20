package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Ingresso;

public interface IIngressoQueryService {
	
	Ingresso findById(final long id);

	Ingresso findByCpf(final String cpf);

	List<Ingresso> list();

	void verifyCpf(final String cpf);

	void verifyCpf(final long id, final String cpf);

}
