package com.conecta.brenannd.service.impl;

import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.repository.IngressoRepository;
import com.conecta.brenannd.service.IIngressoService;
import com.conecta.brenannd.service.query.IIngressoQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class IngressoService implements IIngressoService{

	private final IngressoRepository repository;
    private final IIngressoQueryService queryService;

    @Override
    public Ingresso save(Ingresso entity) {
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
