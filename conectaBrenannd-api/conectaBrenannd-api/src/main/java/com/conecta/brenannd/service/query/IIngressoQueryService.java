package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Ingresso;

public interface IIngressoQueryService {

	Ingresso findById(final long id);

	Ingresso findByCpf(final String cpf);

	List<Ingresso> list();

	List<Ingresso> listByUser();

	public Ingresso findByIdFromSession(Long ingressoId);

	void verifyCpf(final String cpf);

	void verifyCpf(final long id, final String cpf);

	Ingresso findByCpfToken(String cpfToken);

}
