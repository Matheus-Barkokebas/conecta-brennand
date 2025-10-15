package com.conecta.brenannd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conecta.brenannd.entity.Dependente;

public interface DependentesRepository extends JpaRepository<Dependente, Long>{
	
	List<Dependente> findAllByUsuarioId(Long usuarioId);

}
