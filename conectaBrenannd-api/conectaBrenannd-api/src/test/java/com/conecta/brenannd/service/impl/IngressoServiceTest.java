package com.conecta.brenannd.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.conecta.brenannd.controller.dto.ValidacaoIngressoResponseDTO;
import com.conecta.brenannd.entity.Ingresso;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.enums.StatusIngresso;
import com.conecta.brenannd.repository.IngressoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IIngressoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("IngressoService Tests")
class IngressoServiceTest {

	@Mock
	private IngressoRepository ingressoRepository;

	@Mock
	private IIngressoQueryService ingressoQueryService;

	@Mock
	private UsuarioQueryService usuarioQueryService;

	@Mock
	private SecurityContext securityContext;

	@Mock
	private Authentication authentication;

	@InjectMocks
	private IngressoService ingressoService;

	private Ingresso ingresso;
	private Usuario usuario;

	@BeforeEach
	void setUp() {
		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setCpf("123.456.789-00");
		usuario.setPermissao(Permissao.VISITANTE);

		ingresso = new Ingresso();
		ingresso.setId(1L);
		ingresso.setCpfToken("123.456.789-00");
		ingresso.setTipoIngresso("Gratuito");
		ingresso.setDataEmissao(LocalDate.now());
		ingresso.setStatus(StatusIngresso.ATIVO);
		ingresso.setUsuario(usuario);
	}

	@Test
	@DisplayName("Deve salvar um novo ingresso com sucesso")
	void testSaveIngressoSuccess() {
		// Arrange
		Ingresso novoIngresso = new Ingresso();
		novoIngresso.setCpfToken("123.456.789-00");
		novoIngresso.setTipoIngresso("Gratuito");

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findByCpf("123.456.789-00")).thenReturn(usuario);
		when(ingressoRepository.findByCpfTokenAndDataEmissaoAndStatus(eq("123.456.789-00"), any(LocalDate.class), eq(StatusIngresso.ATIVO)))
				.thenReturn(Optional.empty());
		when(ingressoRepository.save(any(Ingresso.class))).thenReturn(ingresso);

		// Act
		Ingresso resultado = ingressoService.save(novoIngresso);

		// Assert
		assertNotNull(resultado);
		assertEquals("123.456.789-00", resultado.getCpfToken());
		assertEquals(StatusIngresso.ATIVO, resultado.getStatus());
		assertEquals(usuario, resultado.getUsuario());
		assertEquals(LocalDate.now(), resultado.getDataEmissao());
		verify(usuarioQueryService, times(1)).findByCpf("123.456.789-00");
		verify(ingressoRepository, times(1)).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve lançar exceção ao tentar salvar ingresso duplicado")
	void testSaveIngressoDuplicadoThrowsException() {
		// Arrange
		Ingresso novoIngresso = new Ingresso();
		novoIngresso.setCpfToken("123.456.789-00");
		novoIngresso.setTipoIngresso("Gratuito");

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findByCpf("123.456.789-00")).thenReturn(usuario);
		when(ingressoRepository.findByCpfTokenAndDataEmissaoAndStatus(eq("123.456.789-00"), any(LocalDate.class), eq(StatusIngresso.ATIVO)))
				.thenReturn(Optional.of(ingresso));

		// Act & Assert
		assertThrows(RuntimeException.class, () -> ingressoService.save(novoIngresso));
		verify(usuarioQueryService, times(1)).findByCpf("123.456.789-00");
		verify(ingressoRepository, never()).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve atualizar um ingresso com sucesso")
	void testUpdateIngressoSuccess() {
		// Arrange
		Ingresso ingressoAtualizado = new Ingresso();
		ingressoAtualizado.setStatus(StatusIngresso.USADO);
		ingressoAtualizado.setDataUtilizacao(LocalDate.now());

		when(ingressoQueryService.findById(1L)).thenReturn(ingresso);
		when(ingressoRepository.save(any(Ingresso.class))).thenReturn(ingressoAtualizado);

		// Act
		Ingresso resultado = ingressoService.update(1L, ingressoAtualizado);

		// Assert
		assertNotNull(resultado);
		assertEquals(StatusIngresso.USADO, resultado.getStatus());
		verify(ingressoQueryService, times(1)).findById(1L);
		verify(ingressoRepository, times(1)).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve deletar um ingresso com sucesso")
	void testDeleteIngressoSuccess() {
		// Arrange
		when(ingressoQueryService.findById(1L)).thenReturn(ingresso);
		doNothing().when(ingressoRepository).deleteById(1L);

		// Act
		ingressoService.delete(1L);

		// Assert
		verify(ingressoQueryService, times(1)).findById(1L);
		verify(ingressoRepository, times(1)).deleteById(1L);
	}

	@Test
	@DisplayName("Deve validar ingresso ativo com sucesso")
	void testValidarIngressoAtivoSuccess() {
		// Arrange
		Ingresso ingressoValidado = new Ingresso();
		ingressoValidado.setId(1L);
		ingressoValidado.setCpfToken("123.456.789-00");
		ingressoValidado.setStatus(StatusIngresso.ATIVO);
		ingressoValidado.setDataEmissao(LocalDate.now());

		when(ingressoQueryService.findByCpfToken("123.456.789-00")).thenReturn(ingressoValidado);
		when(ingressoRepository.save(any(Ingresso.class))).thenReturn(ingressoValidado);

		// Act
		ValidacaoIngressoResponseDTO resultado = ingressoService.validarIngresso("123.456.789-00");

		// Assert
		assertNotNull(resultado);
		assertTrue(resultado.getMensagem().contains("Acesso liberado"));
		assertEquals(StatusIngresso.USADO, resultado.getStatus());
		verify(ingressoQueryService, times(1)).findByCpfToken("123.456.789-00");
		verify(ingressoRepository, times(1)).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve retornar mensagem de ingresso não encontrado")
	void testValidarIngressoNaoEncontrado() {
		// Arrange
		when(ingressoQueryService.findByCpfToken("000.000.000-00")).thenReturn(null);

		// Act
		ValidacaoIngressoResponseDTO resultado = ingressoService.validarIngresso("000.000.000-00");

		// Assert
		assertNotNull(resultado);
		assertTrue(resultado.getMensagem().contains("não encontrado"));
		assertNull(resultado.getStatus());
		verify(ingressoQueryService, times(1)).findByCpfToken("000.000.000-00");
		verify(ingressoRepository, never()).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve retornar mensagem de ingresso já utilizado")
	void testValidarIngressoJaUtilizado() {
		// Arrange
		Ingresso ingressoUsado = new Ingresso();
		ingressoUsado.setId(1L);
		ingressoUsado.setCpfToken("123.456.789-00");
		ingressoUsado.setStatus(StatusIngresso.USADO);
		ingressoUsado.setDataUtilizacao(LocalDate.now());

		when(ingressoQueryService.findByCpfToken("123.456.789-00")).thenReturn(ingressoUsado);

		// Act
		ValidacaoIngressoResponseDTO resultado = ingressoService.validarIngresso("123.456.789-00");

		// Assert
		assertNotNull(resultado);
		assertTrue(resultado.getMensagem().contains("já foi utilizado"));
		assertEquals(StatusIngresso.USADO, resultado.getStatus());
		verify(ingressoQueryService, times(1)).findByCpfToken("123.456.789-00");
		verify(ingressoRepository, never()).save(any(Ingresso.class));
	}

	@Test
	@DisplayName("Deve retornar mensagem de ingresso cancelado")
	void testValidarIngressoCancelado() {
		// Arrange
		Ingresso ingressoCancelado = new Ingresso();
		ingressoCancelado.setId(1L);
		ingressoCancelado.setCpfToken("123.456.789-00");
		ingressoCancelado.setStatus(StatusIngresso.CANCELADO);

		when(ingressoQueryService.findByCpfToken("123.456.789-00")).thenReturn(ingressoCancelado);

		// Act
		ValidacaoIngressoResponseDTO resultado = ingressoService.validarIngresso("123.456.789-00");

		// Assert
		assertNotNull(resultado);
		assertTrue(resultado.getMensagem().contains("cancelado"));
		assertEquals(StatusIngresso.CANCELADO, resultado.getStatus());
		verify(ingressoQueryService, times(1)).findByCpfToken("123.456.789-00");
		verify(ingressoRepository, never()).save(any(Ingresso.class));
	}

}
