package com.conecta.brenannd.service.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.IngressoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.IIngressoService;
import com.conecta.brenannd.service.query.IIngressoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class IngressoService implements IIngressoService{
	

    @Autowired
    private UsuarioQueryService usuarioQueryService;

	private final IngressoRepository repository;
    private final IIngressoQueryService queryService;

    @Override
    public Ingresso save(Ingresso entity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        Usuario usuario = usuarioQueryService.findByCpf(userPrincipal.getCpf());

        entity.setUsuario(usuario);
        entity.setCpfToken(userPrincipal.getCpf());

        queryService.verifyCpf(entity.getCpfToken());

        return repository.save(entity);
    }

    @Override
    public Ingresso update(long id, Ingresso entity) {
        var stored = queryService.findById(id);  
        
        stored.setUsuario(entity.getUsuario());
        stored.setCpfToken(entity.getCpfToken());
        stored.setDataEmissao(entity.getDataEmissao());
        stored.setDataUtilizacao(entity.getDataUtilizacao());
        stored.setStatus(entity.getStatus());
        
        return repository.save(stored);
    }

    @Override
    public void delete(long id) {
        queryService.findById(id);
        repository.deleteById(id);
    }
}
