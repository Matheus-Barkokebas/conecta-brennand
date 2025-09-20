package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.repository.IngressoRepository;
import com.conecta.brenannd.service.query.IIngressoQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class IngressoQueryService implements IIngressoQueryService{
	
	private IngressoRepository repository;

	@Override
	public Ingresso findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public Ingresso findByCpf(String cpf) {
		return repository.findByCpfToken(cpf).orElseThrow();
	}

	@Override
	public List<Ingresso> list() {
		return repository.findAll();
	}

	@Override
	public void verifyCpf(String cpf) {
		if (repository.existsByCpfToken(cpf)) {
			var message = "O CPF " + cpf + " já está em uso";
		}
	}

	@Override
	public void verifyCpf(long id, String cpf) {
		var optional = repository.findByCpfToken(cpf);
		if (optional.isPresent() && optional.get().getCpfToken().equals(cpf)) {
			var message = "O CPF " + cpf + " já está em uso";
		}

	}

}
