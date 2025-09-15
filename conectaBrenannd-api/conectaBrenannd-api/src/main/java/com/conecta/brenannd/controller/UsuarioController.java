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

import com.conecta.brenannd.controller.dto.UsuarioDto;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.mapper.IUsuarioMapper;
import com.conecta.brenannd.service.impl.UsuarioService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
public class UsuarioController {

	private final UsuarioService service;
	private final UsuarioQueryService queryService;
	private final IUsuarioMapper mapper;

	@PostMapping
	@ResponseStatus(CREATED)
	@PreAuthorize("permitAll()")
	public UsuarioDto save(@RequestBody @Validated final UsuarioDto dto) {
		Usuario entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("{id}")
	public UsuarioDto update(@PathVariable("id") final long id, @RequestBody @Validated final UsuarioDto dto) {
		Usuario entity = mapper.toEntity(dto);
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
	public UsuarioDto findById(@PathVariable("id") final long id) {
		Usuario entity = queryService.findById(id);
		return mapper.toDto(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/cpf/{cpf}")
	public UsuarioDto findByCpf(@PathVariable("cpf") final String cpf) {
		Usuario entity = queryService.findByCpf(cpf);
		return mapper.toDto(entity);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public List<UsuarioDto> list() {
		List<Usuario> entities = queryService.list();
		return mapper.toDtoList(entities);
	}
}
