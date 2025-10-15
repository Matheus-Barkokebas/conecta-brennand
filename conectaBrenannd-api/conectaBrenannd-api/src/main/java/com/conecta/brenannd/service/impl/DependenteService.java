package com.conecta.brenannd.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Dependente;
import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.DependentesRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.IDependenteService;
import com.conecta.brenannd.service.query.IDependenteQueryService;
import com.conecta.brenannd.service.query.impl.GrupoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DependenteService implements IDependenteService{
	
    @Autowired
    private UsuarioQueryService usuarioQueryService;
    
    @Autowired
    private GrupoQueryService grupoQueryService;
	
    private final DependentesRepository repository;
    private final IDependenteQueryService queryService;

    @Override
    public Dependente save(Dependente entity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        Usuario usuario = usuarioQueryService.findById(userPrincipal.getId());
        entity.setUsuario(usuario);

        if (entity.getGrupo() == null || entity.getGrupo().getId() == null) {
            throw new IllegalArgumentException("O grupo do dependente deve ser informado.");
        }

        Grupo grupo = grupoQueryService.findById(entity.getGrupo().getId());
        entity.setGrupo(grupo);

        return repository.save(entity);
    }

    @Override
    public Dependente update(long id, Dependente entity) {
        var stored = queryService.findById(id);  
        
        stored.setNome(entity.getNome());
        stored.setIdade(entity.getIdade());
        
        return repository.save(stored);
    }

    @Override
    public void delete(long id) {
        queryService.findById(id);
        repository.deleteById(id);
    }

}