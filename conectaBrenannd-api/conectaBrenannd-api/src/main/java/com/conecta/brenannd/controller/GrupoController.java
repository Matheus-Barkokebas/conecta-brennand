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

import com.conecta.brenannd.controller.dto.GrupoDto;
import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.mapper.IGrupoMapper;
import com.conecta.brenannd.service.impl.GrupoService;
import com.conecta.brenannd.service.query.impl.GrupoQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/grupos")
@AllArgsConstructor
public class GrupoController {

	private final GrupoService service;
	private final GrupoQueryService queryService;
	private final IGrupoMapper mapper;

	@PostMapping
	@ResponseStatus(CREATED)
	public GrupoDto save(@RequestBody @Validated final GrupoDto dto) {
		Grupo entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}

	@PutMapping("{id}")
	public GrupoDto update(@PathVariable("id") final long id, @RequestBody @Validated final GrupoDto dto) {
		Grupo entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toDto(entity);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	public void delete(@PathVariable("id") final long id) {
		service.delete(id);
	}

	@GetMapping("{id}")
	public GrupoDto findById(@PathVariable("id") final long id) {
		Grupo entity = queryService.findById(id);
		return mapper.toDto(entity);
	}

	@GetMapping
	public List<GrupoDto> list() {
		List<Grupo> entities = queryService.list();
		return mapper.toDtoList(entities);
	}

	@GetMapping("/meus")
	public List<Grupo> meusGrupos() {
		return queryService.listByUser();
	}

}
