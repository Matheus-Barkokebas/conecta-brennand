package com.conecta.brenannd.service.query.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Comunicados;
import com.conecta.brenannd.repository.ComunicadosRepository;
import com.conecta.brenannd.service.query.IComunicadosQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ComunicadosQueryService implements IComunicadosQueryService {
	
	private ComunicadosRepository repository;
	
	@Override
	public Comunicados findById(long id) {
		return repository.findById(id).orElseThrow();
	}
	
	@Override
	public List<Comunicados> list() {
		return repository.findAll();
	}
	
}
