package com.conecta.brenannd.service.query.impl;

import org.springframework.stereotype.Service;

import com.conecta.brenannd.entity.Pesquisa;
import com.conecta.brenannd.repository.PesquisaRepository;
import com.conecta.brenannd.service.query.IPesquisaQueryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PesquisaQueryService implements IPesquisaQueryService{
	
	private PesquisaRepository repository;

	@Override
	public Pesquisa findById(long id) {
		return repository.findById(id).orElseThrow();
	}
}
