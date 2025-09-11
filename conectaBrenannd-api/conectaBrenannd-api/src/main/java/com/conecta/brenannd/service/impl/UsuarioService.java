package com.conecta.brenannd.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.repository.UsuarioRepository;
import com.conecta.brenannd.service.IUsuarioService;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsuarioService implements IUsuarioService {

    private final UsuarioRepository repository;
    private final IUsuarioQueryService queryService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Usuario save(Usuario entity) {
        queryService.verifyCpf(entity.getCpf());
        queryService.verifyEmail(entity.getEmail());

        entity.setSenha(passwordEncoder.encode(entity.getSenha()));

        return repository.save(entity);
    }

    @Override
    public Usuario update(long id, Usuario entity) {
        var stored = queryService.findById(id);  
        
        if (!entity.getSenha().equals(stored.getSenha())) {
            entity.setSenha(passwordEncoder.encode(entity.getSenha()));
        }
        
        stored.setNome(entity.getNome());
        stored.setCpf(entity.getCpf());
        stored.setEmail(entity.getEmail());
        stored.setSenha(entity.getSenha());
        stored.setPermissao(entity.getPermissao());
        
        return repository.save(stored);
    }

    @Override
    public void delete(long id) {
        queryService.findById(id);
        repository.deleteById(id);
    }
}
