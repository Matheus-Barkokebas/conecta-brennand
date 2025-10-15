package com.conecta.brenannd.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

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

import com.conecta.brenannd.controller.dto.DependenteDto;
import com.conecta.brenannd.entity.Dependente;
import com.conecta.brenannd.entity.mapper.IDependentesMapper;
import com.conecta.brenannd.service.impl.DependenteService;
import com.conecta.brenannd.service.query.impl.DependenteQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/dependentes")
@AllArgsConstructor
public class DependenteController {
	
	private final DependenteService service;
	private final DependenteQueryService queryService;
	private final IDependentesMapper mapper;

	@PostMapping
	@ResponseStatus(CREATED)
	public DependenteDto save(@RequestBody @Validated final DependenteDto dto) {
		Dependente entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}

	@PutMapping("{id}")
	public DependenteDto update(@PathVariable("id") final long id, @RequestBody @Validated final DependenteDto dto) {
		Dependente entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toDto(entity);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	public void delete(@PathVariable("id") final long id) {
		service.delete(id);
	}

	@GetMapping("{id}")
	public DependenteDto findById(@PathVariable("id") final long id) {
		Dependente entity = queryService.findById(id);
		return mapper.toDto(entity);
	}

	@GetMapping
	public List<DependenteDto> list() {
		List<Dependente> entities = queryService.list();
		return mapper.toDtoList(entities);
	}
	
    @GetMapping("/meus")
    public List<Dependente> meusDependentes() {
        return queryService.listByUser();
    }

}
