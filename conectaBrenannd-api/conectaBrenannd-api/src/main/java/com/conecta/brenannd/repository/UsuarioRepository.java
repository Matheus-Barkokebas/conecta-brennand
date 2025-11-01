package com.conecta.brenannd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	boolean existsByCpf(final String cpf);

	boolean existsByEmail(final String email);

	Optional<Usuario> findByCpf(final String cpf);

	Optional<Usuario> findByEmail(final String email);

	Optional<Usuario> findByPermissao(final Permissao perm);
}
