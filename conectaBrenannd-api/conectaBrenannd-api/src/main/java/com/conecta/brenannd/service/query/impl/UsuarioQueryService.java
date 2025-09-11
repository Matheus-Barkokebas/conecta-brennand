package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.UsuarioRepository;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsuarioQueryService implements IUsuarioQueryService {

	private UsuarioRepository repository;

	@Override
	public Usuario findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public Usuario findByCpf(String cpf) {
		return repository.findByCpf(cpf).orElseThrow();
	}

	@Override
	public List<Usuario> list() {
		return repository.findAll();
	}

	@Override
	public void verifyCpf(String cpf) {
		if (repository.existsByCpf(cpf)) {
			var message = "O CPF " + cpf + " já está em uso";
		}
	}

	@Override
	public void verifyCpf(long id, String cpf) {
		var optional = repository.findByCpf(cpf);
		if (optional.isPresent() && optional.get().getCpf().equals(cpf)) {
			var message = "O CPF " + cpf + " já está em uso";
		}

	}

	@Override
	public void verifyEmail(String email) {
		if (repository.existsByEmail(email)) {
			var message = "O EMAIL " + email + " já está em uso";
		}

	}

	@Override
	public void verifyEmail(long id, String email) {
		var optional = repository.findByEmail(email);
		if (optional.isPresent() && optional.get().getEmail().equals(email)) {
			var message = "O EMAIL " + email + "já está em uso";
		}

	}

}