package com.conecta.brenannd.service.query;

import java.util.List;

import com.conecta.brenannd.entity.Usuario;

public interface IUsuarioQueryService {

	Usuario findById(final long id);

	Usuario findByCpf(final String cpf);

	List<Usuario> list();

	void verifyCpf(final String cpf);

	void verifyCpf(final long id, final String cpf);

	void verifyEmail(final String email);

	void verifyEmail(final long id, final String email);

}
