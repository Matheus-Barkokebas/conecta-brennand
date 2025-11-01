package com.conecta.brenannd.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Pesquisa;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.PesquisaRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.IPesquisaService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PesquisaService implements IPesquisaService {

	@Autowired
	private UsuarioQueryService usuarioQueryService;

	private final PesquisaRepository repository;

	@Override
	public Pesquisa save(Pesquisa entity) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findById(userPrincipal.getId());

		entity.setUsuario(usuario);

		return repository.save(entity);
	}

}
