package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Dependente;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.DependentesRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IDependenteQueryService;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DependenteQueryService implements IDependenteQueryService{
	
	private DependentesRepository repository;
	private final IUsuarioQueryService usuarioQueryService;
	
	@Override
	public Dependente findById(long id) {
		return repository.findById(id).orElseThrow();
	}
	
	@Override
	public List<Dependente> list() {
		return repository.findAll();
	}
	
    @Override
    public List<Dependente> listByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        Usuario usuario = usuarioQueryService.findByCpf(userPrincipal.getCpf());
        return repository.findAllByUsuarioId(usuario.getId());
    }
}