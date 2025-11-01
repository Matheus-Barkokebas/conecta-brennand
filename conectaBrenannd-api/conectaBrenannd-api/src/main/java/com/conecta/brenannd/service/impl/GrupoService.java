package com.conecta.brenannd.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.GrupoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.IGrupoService;
import com.conecta.brenannd.service.query.IGrupoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GrupoService implements IGrupoService {

	@Autowired
	private UsuarioQueryService usuarioQueryService;

	private final GrupoRepository repository;
	private final IGrupoQueryService queryService;

	@Override
	public Grupo save(Grupo entity) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		Usuario usuario = usuarioQueryService.findById(userPrincipal.getId());

		entity.setUsuario(usuario);

		return repository.save(entity);
	}

	@Override
	public Grupo update(long id, Grupo entity) {
		var stored = queryService.findById(id);

		stored.setNome(entity.getNome());
		stored.setTipoGrupo(entity.getTipoGrupo());

		return repository.save(stored);
	}

	@Override
	public void delete(long id) {
		queryService.findById(id);
		repository.deleteById(id);
	}

}
