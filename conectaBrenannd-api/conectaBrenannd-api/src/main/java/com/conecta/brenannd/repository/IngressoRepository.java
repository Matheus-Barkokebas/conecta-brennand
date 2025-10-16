package com.conecta.brenannd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.enums.StatusIngresso;

public interface IngressoRepository extends JpaRepository<Ingresso, Long>{
	
	boolean existsByCpfToken(final String cpf);
	
	Optional<Ingresso> findByCpfToken(final String cpfToken);

	Optional<Ingresso> findByStatus(final StatusIngresso status);
	
    List<Ingresso> findAllByUsuarioId(Long usuarioId);

    Optional<Ingresso> findByIdAndUsuarioId(Long ingressoId, Long usuarioId);

}
