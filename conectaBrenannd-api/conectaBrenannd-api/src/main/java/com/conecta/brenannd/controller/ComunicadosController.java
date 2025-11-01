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

import com.conecta.brenannd.controller.dto.ComunicadosDto;
import com.conecta.brenannd.entity.Comunicados;
import com.conecta.brenannd.entity.mapper.IComunicadosMapper;
import com.conecta.brenannd.service.impl.ComunicadosService;
import com.conecta.brenannd.service.query.impl.ComunicadosQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/comunicados")
@AllArgsConstructor
public class ComunicadosController {

	private final ComunicadosService service;
	private final ComunicadosQueryService queryService;
	private final IComunicadosMapper mapper;

	@PostMapping
	@ResponseStatus(CREATED)
	public ComunicadosDto save(@RequestBody @Validated final ComunicadosDto dto) {
		Comunicados entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}

	@PutMapping("{id}")
	public ComunicadosDto update(@PathVariable("id") final long id, @RequestBody @Validated final ComunicadosDto dto) {
		Comunicados entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toDto(entity);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	public void delete(@PathVariable("id") final long id) {
		service.delete(id);
	}

	@GetMapping("{id}")
	public ComunicadosDto findById(@PathVariable("id") final long id) {
		Comunicados entity = queryService.findById(id);
		return mapper.toDto(entity);
	}

	@GetMapping
	public List<Comunicados> list() {
		List<Comunicados> entities = queryService.list();
		return mapper.toDtoList(entities);
	}

}
