package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.GrupoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IGrupoQueryService;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GrupoQueryService implements IGrupoQueryService {

	private GrupoRepository repository;
	private final IUsuarioQueryService usuarioQueryService;

	@Override
	public Grupo findById(long id) {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public List<Grupo> list() {
		return repository.findAll();
	}

	@Override
	public List<Grupo> listByUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findByCpf(userPrincipal.getCpf());
		return repository.findAllByUsuarioId(usuario.getId());
	}
}
