package com.conecta.brenannd.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

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

import com.conecta.brenannd.entity.Pesquisa;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.repository.PesquisaRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("PesquisaService Tests")
class PesquisaServiceTest {

	@Mock
	private PesquisaRepository pesquisaRepository;

	@Mock
	private UsuarioQueryService usuarioQueryService;

	@Mock
	private SecurityContext securityContext;

	@Mock
	private Authentication authentication;

	@InjectMocks
	private PesquisaService pesquisaService;

	private Pesquisa pesquisa;
	private Usuario usuario;

	@BeforeEach
	void setUp() {
		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setPermissao(Permissao.VISITANTE);

		pesquisa = new Pesquisa();
		pesquisa.setId(1L);
		pesquisa.setDescricao("Excelente serviço!");
		pesquisa.setEstrelas(5);
		pesquisa.setUsuario(usuario);
	}

	@Test
	@DisplayName("Deve salvar uma nova pesquisa com sucesso")
	void testSavePesquisaSuccess() {
		// Arrange
		Pesquisa novaPesquisa = new Pesquisa();
		novaPesquisa.setDescricao("Excelente serviço!");
		novaPesquisa.setEstrelas(5);

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(pesquisaRepository.save(any(Pesquisa.class))).thenReturn(pesquisa);

		// Act
		Pesquisa resultado = pesquisaService.save(novaPesquisa);

		// Assert
		assertNotNull(resultado);
		assertEquals("Excelente serviço!", resultado.getDescricao());
		assertEquals(5, resultado.getEstrelas());
		assertEquals(usuario, resultado.getUsuario());
		verify(usuarioQueryService, times(1)).findById(1L);
		verify(pesquisaRepository, times(1)).save(any(Pesquisa.class));
	}

	@Test
	@DisplayName("Deve salvar pesquisa com descrição nula")
	void testSavePesquisaComDescricaoNula() {
		// Arrange
		Pesquisa novaPesquisa = new Pesquisa();
		novaPesquisa.setDescricao(null);
		novaPesquisa.setEstrelas(4);

		Pesquisa pesquisaComNula = new Pesquisa();
		pesquisaComNula.setId(1L);
		pesquisaComNula.setDescricao(null);
		pesquisaComNula.setEstrelas(4);
		pesquisaComNula.setUsuario(usuario);

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(pesquisaRepository.save(any(Pesquisa.class))).thenReturn(pesquisaComNula);

		// Act
		Pesquisa resultado = pesquisaService.save(novaPesquisa);

		// Assert
		assertNotNull(resultado);
		assertNull(resultado.getDescricao());
		verify(pesquisaRepository, times(1)).save(any(Pesquisa.class));
	}

	@Test
	@DisplayName("Deve associar usuário autenticado na pesquisa")
	void testSavaPesquisaComUsuarioAutenticado() {
		// Arrange
		Pesquisa novaPesquisa = new Pesquisa();
		novaPesquisa.setDescricao("Bom atendimento");
		novaPesquisa.setEstrelas(4);

		Usuario outroUsuario = new Usuario();
		outroUsuario.setId(2L);
		outroUsuario.setNome("Maria Santos");

		UserDetailsImpl userDetails = new UserDetailsImpl(2L, "maria", "maria@example.com", "senha456", "987.654.321-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(2L)).thenReturn(outroUsuario);

		Pesquisa pesquisaComOutroUsuario = new Pesquisa();
		pesquisaComOutroUsuario.setId(1L);
		pesquisaComOutroUsuario.setDescricao("Bom atendimento");
		pesquisaComOutroUsuario.setEstrelas(4);
		pesquisaComOutroUsuario.setUsuario(outroUsuario);

		when(pesquisaRepository.save(any(Pesquisa.class))).thenReturn(pesquisaComOutroUsuario);

		// Act
		Pesquisa resultado = pesquisaService.save(novaPesquisa);

		// Assert
		assertNotNull(resultado);
		assertEquals(outroUsuario, resultado.getUsuario());
		assertEquals(2L, resultado.getUsuario().getId());
		verify(usuarioQueryService, times(1)).findById(2L);
	}

}
