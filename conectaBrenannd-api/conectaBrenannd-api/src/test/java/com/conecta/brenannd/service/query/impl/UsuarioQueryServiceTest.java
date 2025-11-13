package com.conecta.brenannd.service.query.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.repository.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("UsuarioQueryService Tests")
class UsuarioQueryServiceTest {

	@Mock
	private UsuarioRepository usuarioRepository;

	@InjectMocks
	private UsuarioQueryService usuarioQueryService;

	private Usuario usuario1;
	private Usuario usuario2;

	@BeforeEach
	void setUp() {
		usuario1 = new Usuario();
		usuario1.setId(1L);
		usuario1.setNome("João Silva");
		usuario1.setEmail("joao@example.com");
		usuario1.setSenha("senha123");
		usuario1.setCpf("123.456.789-00");
		usuario1.setPermissao(Permissao.VISITANTE);

		usuario2 = new Usuario();
		usuario2.setId(2L);
		usuario2.setNome("Maria Santos");
		usuario2.setEmail("maria@example.com");
		usuario2.setSenha("senha456");
		usuario2.setCpf("987.654.321-00");
		usuario2.setPermissao(Permissao.ADMIN);
	}

	@Test
	@DisplayName("Deve encontrar usuário por ID com sucesso")
	void testFindByIdSuccess() {
		// Arrange
		when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario1));

		// Act
		Usuario resultado = usuarioQueryService.findById(1L);

		// Assert
		assertNotNull(resultado);
		assertEquals(1L, resultado.getId());
		assertEquals("João Silva", resultado.getNome());
		verify(usuarioRepository, times(1)).findById(1L);
	}

	@Test
	@DisplayName("Deve lançar exceção ao não encontrar usuário por ID")
	void testFindByIdNotFound() {
		// Arrange
		when(usuarioRepository.findById(999L)).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(Exception.class, () -> usuarioQueryService.findById(999L));
		verify(usuarioRepository, times(1)).findById(999L);
	}

	@Test
	@DisplayName("Deve encontrar usuário por CPF com sucesso")
	void testFindByCpfSuccess() {
		// Arrange
		when(usuarioRepository.findByCpf("123.456.789-00")).thenReturn(Optional.of(usuario1));

		// Act
		Usuario resultado = usuarioQueryService.findByCpf("123.456.789-00");

		// Assert
		assertNotNull(resultado);
		assertEquals("123.456.789-00", resultado.getCpf());
		assertEquals("João Silva", resultado.getNome());
		verify(usuarioRepository, times(1)).findByCpf("123.456.789-00");
	}

	@Test
	@DisplayName("Deve lançar exceção ao não encontrar usuário por CPF")
	void testFindByCpfNotFound() {
		// Arrange
		when(usuarioRepository.findByCpf("000.000.000-00")).thenReturn(Optional.empty());

		// Act & Assert
		assertThrows(Exception.class, () -> usuarioQueryService.findByCpf("000.000.000-00"));
		verify(usuarioRepository, times(1)).findByCpf("000.000.000-00");
	}

	@Test
	@DisplayName("Deve listar todos os usuários com sucesso")
	void testListSuccess() {
		// Arrange
		List<Usuario> usuarios = Arrays.asList(usuario1, usuario2);
		when(usuarioRepository.findAll()).thenReturn(usuarios);

		// Act
		List<Usuario> resultado = usuarioQueryService.list();

		// Assert
		assertNotNull(resultado);
		assertEquals(2, resultado.size());
		assertEquals("João Silva", resultado.get(0).getNome());
		assertEquals("Maria Santos", resultado.get(1).getNome());
		verify(usuarioRepository, times(1)).findAll();
	}

	@Test
	@DisplayName("Deve retornar lista vazia quando não há usuários")
	void testListEmpty() {
		// Arrange
		when(usuarioRepository.findAll()).thenReturn(Arrays.asList());

		// Act
		List<Usuario> resultado = usuarioQueryService.list();

		// Assert
		assertNotNull(resultado);
		assertTrue(resultado.isEmpty());
		verify(usuarioRepository, times(1)).findAll();
	}

}
