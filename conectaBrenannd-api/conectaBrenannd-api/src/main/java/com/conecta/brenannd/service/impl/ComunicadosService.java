package com.conecta.brenannd.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Comunicados;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.ComunicadosRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.IComunicadosService;
import com.conecta.brenannd.service.query.IComunicadosQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ComunicadosService implements IComunicadosService {

	@Autowired
	private UsuarioQueryService usuarioQueryService;

	private final ComunicadosRepository repository;
	private final IComunicadosQueryService queryService;

	@Override
	public Comunicados save(Comunicados entity) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findById(userPrincipal.getId());

		entity.setUsuario(usuario);

		return repository.save(entity);
	}

	@Override
	public Comunicados update(long id, Comunicados entity) {
		var stored = queryService.findById(id);

		stored.setTitulo(entity.getTitulo());
		stored.setDescricao(entity.getDescricao());

		return repository.save(stored);
	}

	@Override
	public void delete(long id) {
		queryService.findById(id);
		repository.deleteById(id);
	}

}
