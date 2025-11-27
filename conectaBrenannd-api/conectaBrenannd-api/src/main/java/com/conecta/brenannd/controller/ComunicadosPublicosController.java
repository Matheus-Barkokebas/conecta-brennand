package com.conecta.brenannd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conecta.brenannd.entity.Comunicados;
import com.conecta.brenannd.entity.mapper.IComunicadosMapper;
import com.conecta.brenannd.service.query.impl.ComunicadosQueryService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/comunicadosPublicos")
@AllArgsConstructor
public class ComunicadosPublicosController {

	private final ComunicadosQueryService queryService;
	private final IComunicadosMapper mapper;

	@GetMapping
	public List<Comunicados> list() {
		List<Comunicados> entities = queryService.list();
		return mapper.toDtoList(entities);
	}

}
