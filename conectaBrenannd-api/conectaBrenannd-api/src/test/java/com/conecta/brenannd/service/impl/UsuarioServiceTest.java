package com.conecta.brenannd.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.repository.UsuarioRepository;
import com.conecta.brenannd.service.query.IUsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("UsuarioService Tests")
class UsuarioServiceTest {

	@Mock
	private UsuarioRepository usuarioRepository;

	@Mock
	private IUsuarioQueryService queryService;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private UsuarioService usuarioService;

	private Usuario usuario;

	@BeforeEach
	void setUp() {
		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setSenha("senha123");
		usuario.setCpf("123.456.789-00");
		usuario.setTelefone("11999999999");
		usuario.setDataNascimento(LocalDate.of(1990, 5, 15));
		usuario.setEndereco("Rua A, 123");
		usuario.setCidade("São Paulo");
		usuario.setEstado("SP");
		usuario.setCep("01310-100");
		usuario.setPermissao(Permissao.VISITANTE);
	}

	@Test
	@DisplayName("Deve salvar um novo usuário com sucesso")
	void testSaveUsuarioSuccess() {
		// Arrange
		doNothing().when(queryService).verifyCpf(usuario.getCpf());
		doNothing().when(queryService).verifyEmail(usuario.getEmail());
		when(passwordEncoder.encode(usuario.getSenha())).thenReturn("senhaCriptografada123");
		when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

		// Act
		Usuario resultado = usuarioService.save(usuario);

		// Assert
		assertNotNull(resultado);
		assertEquals(usuario.getId(), resultado.getId());
		assertEquals(usuario.getNome(), resultado.getNome());
		assertEquals(usuario.getEmail(), resultado.getEmail());
		verify(queryService, times(1)).verifyCpf(usuario.getCpf());
		verify(queryService, times(1)).verifyEmail(usuario.getEmail());
		verify(usuarioRepository, times(1)).save(any(Usuario.class));
	}

	@Test
	@DisplayName("Deve atualizar um usuário com sucesso")
	void testUpdateUsuarioSuccess() {
		// Arrange
		Usuario usuarioAtualizado = new Usuario();
		usuarioAtualizado.setId(1L);
		usuarioAtualizado.setNome("João Silva Atualizado");
		usuarioAtualizado.setEmail("joao.atualizado@example.com");
		usuarioAtualizado.setSenha("novaSenha123");
		usuarioAtualizado.setCpf("987.654.321-00");
		usuarioAtualizado.setPermissao(Permissao.ADMIN);

		when(queryService.findById(1L)).thenReturn(usuario);
		when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioAtualizado);

		// Act
		Usuario resultado = usuarioService.update(1L, usuarioAtualizado);

		// Assert
		assertNotNull(resultado);
		assertEquals("João Silva Atualizado", resultado.getNome());
		assertEquals(Permissao.ADMIN, resultado.getPermissao());
		verify(queryService, times(1)).findById(1L);
		verify(usuarioRepository, times(1)).save(any(Usuario.class));
	}

	@Test
	@DisplayName("Deve deletar um usuário com sucesso")
	void testDeleteUsuarioSuccess() {
		// Arrange
		when(queryService.findById(1L)).thenReturn(usuario);
		doNothing().when(usuarioRepository).deleteById(1L);

		// Act
		usuarioService.delete(1L);

		// Assert
		verify(queryService, times(1)).findById(1L);
		verify(usuarioRepository, times(1)).deleteById(1L);
	}

	@Test
	@DisplayName("Deve criptografar a senha ao salvar novo usuário")
	void testSenhaEhCriptografadaAoSalvar() {
		// Arrange
		String senhaOriginal = "senha123";
		String senhaCriptografada = "senhaCriptografada";

		usuario.setSenha(senhaOriginal);

		doNothing().when(queryService).verifyCpf(usuario.getCpf());
		doNothing().when(queryService).verifyEmail(usuario.getEmail());
		when(passwordEncoder.encode(senhaOriginal)).thenReturn(senhaCriptografada);
		when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

		// Act
		usuarioService.save(usuario);

		// Assert
		verify(passwordEncoder, times(1)).encode(senhaOriginal);
	}

	@Test
	@DisplayName("Deve atualizar senha criptografada se diferentes")
	void testAtualizarSenhaCriptografada() {
		// Arrange
		Usuario usuarioAtualizado = new Usuario();
		usuarioAtualizado.setNome("João Silva");
		usuarioAtualizado.setEmail("joao@example.com");
		usuarioAtualizado.setSenha("novaSenha456");
		usuarioAtualizado.setCpf("123.456.789-00");
		usuarioAtualizado.setPermissao(Permissao.VISITANTE);

		when(queryService.findById(1L)).thenReturn(usuario);
		when(passwordEncoder.encode("novaSenha456")).thenReturn("senhaCriptografadaNova");
		when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioAtualizado);

		// Act
		usuarioService.update(1L, usuarioAtualizado);

		// Assert
		verify(passwordEncoder, times(1)).encode("novaSenha456");
	}

}
