package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.IngressoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IIngressoQueryService;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class IngressoQueryService implements IIngressoQueryService {

	private IngressoRepository repository;
	private final IUsuarioQueryService usuarioQueryService;

	@Override
	public Ingresso findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public Ingresso findByCpf(String cpf) {
		return repository.findByCpfToken(cpf).orElseThrow();
	}

	@Override
	public Ingresso findByCpfToken(String cpfToken) {
		return repository.findByCpfToken(cpfToken).orElseThrow(() -> new RuntimeException("Ingresso não encontrado."));
	}

	@Override
	public List<Ingresso> list() {
		return repository.findAll();
	}

	@Override
	public List<Ingresso> listByUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findByCpf(userPrincipal.getCpf());
		return repository.findAllByUsuarioId(usuario.getId());
	}

	@Override
	public Ingresso findByIdFromSession(Long ingressoId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findByCpf(userPrincipal.getCpf());

		return repository.findByIdAndUsuarioId(ingressoId, usuario.getId())
				.orElseThrow(() -> new RuntimeException("Ingresso não encontrado para este usuário"));
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
