package com.conecta.brenannd.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conecta.brenannd.controller.dto.IngressoDto;
import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.entity.mapper.IIngressoMapper;
import com.conecta.brenannd.service.impl.IngressoService;
import com.conecta.brenannd.service.query.impl.IngressoQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/ingressos")
@AllArgsConstructor
public class IngressoController {

    private final IngressoService service;
    private final IngressoQueryService queryService;
    private final IIngressoMapper mapper;

    @PostMapping
    @ResponseStatus(CREATED)
    @PreAuthorize("permitAll()")
    public IngressoDto save(@RequestBody @Validated final IngressoDto dto) {
        Ingresso entity = mapper.toEntity(dto);
        service.save(entity);
        return mapper.toDto(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public IngressoDto update(@PathVariable("id") final long id, @RequestBody @Validated final IngressoDto dto) {
        Ingresso entity = mapper.toEntity(dto);
        service.update(id, entity);
        return mapper.toDto(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable("id") final long id) {
        service.delete(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("{id}")
    public IngressoDto findById(@PathVariable("id") final long id) {
        Ingresso entity = queryService.findById(id);
        return mapper.toDto(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/cpf/{cpf}")
    public IngressoDto findByCpf(@PathVariable("cpf") final String cpf) {
        Ingresso entity = queryService.findByCpf(cpf);
        return mapper.toDto(entity);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<IngressoDto> list() {
        List<Ingresso> entities = queryService.list();
        return mapper.toDtoList(entities);
    }
}
