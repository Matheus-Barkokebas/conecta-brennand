package com.conecta.brenannd.controller;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conecta.brenannd.controller.dto.PesquisaDto;
import com.conecta.brenannd.entity.Pesquisa;
import com.conecta.brenannd.entity.mapper.IPesquisaMapper;
import com.conecta.brenannd.service.impl.PesquisaService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/pesquisas")
@AllArgsConstructor
public class PesquisaController {
	
	private final PesquisaService service;
	private final IPesquisaMapper mapper;

	@PostMapping
	@ResponseStatus(CREATED)
	public PesquisaDto save(@RequestBody @Validated final PesquisaDto dto) {
		Pesquisa entity = mapper.toEntity(dto);
		service.save(entity);
		return mapper.toDto(entity);
	}
}
