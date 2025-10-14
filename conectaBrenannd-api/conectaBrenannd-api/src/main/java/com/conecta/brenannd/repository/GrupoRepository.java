package com.conecta.brenannd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Ingresso;

public interface GrupoRepository extends JpaRepository<Grupo, Long>{

	List<Grupo> findAllByUsuarioId(Long usuarioId);
}
