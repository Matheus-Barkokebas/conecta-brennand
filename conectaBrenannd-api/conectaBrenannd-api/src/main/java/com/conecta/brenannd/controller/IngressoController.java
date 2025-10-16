package com.conecta.brenannd.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conecta.brenannd.controller.dto.IngressoDto;
import com.conecta.brenannd.controller.dto.ValidacaoIngressoResponseDTO;
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
	public IngressoDto save(@RequestBody @Validated final IngressoDto dto) {
		Ingresso entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}

	@PostMapping("/validar")
	public ResponseEntity<ValidacaoIngressoResponseDTO> validarIngresso(@RequestParam String cpfToken) {
		var response = service.validarIngresso(cpfToken);
		return ResponseEntity.ok(response);
	}

	@PutMapping("{id}")
	public IngressoDto update(@PathVariable("id") final long id, @RequestBody @Validated final IngressoDto dto) {
		Ingresso entity = mapper.toEntity(dto);
		service.update(id, entity);
		return mapper.toDto(entity);
	}

	@DeleteMapping("{id}")
	@ResponseStatus(NO_CONTENT)
	public void delete(@PathVariable("id") final long id) {
		service.delete(id);
	}

	@GetMapping("{id}")
	public IngressoDto findById(@PathVariable("id") final long id) {
		Ingresso entity = queryService.findById(id);
		return mapper.toDto(entity);
	}

	@GetMapping("/cpf/{cpf}")
	public IngressoDto findByCpf(@PathVariable("cpf") final String cpf) {
		Ingresso entity = queryService.findByCpf(cpf);
		return mapper.toDto(entity);
	}

	@GetMapping("/meus")
	public List<Ingresso> meusIngressos() {
		return queryService.listByUser();
	}

	@GetMapping("/meus/{id}")
	public Ingresso meuIngresso(@PathVariable Long id) {
		return queryService.findByIdFromSession(id);
	}

	@GetMapping
	public List<IngressoDto> list() {
		List<Ingresso> entities = queryService.list();
		return mapper.toDtoList(entities);
	}
}
