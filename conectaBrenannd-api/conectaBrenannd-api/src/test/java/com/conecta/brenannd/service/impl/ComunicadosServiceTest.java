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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.conecta.brenannd.entity.Comunicados;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.repository.ComunicadosRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IComunicadosQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("ComunicadosService Tests")
class ComunicadosServiceTest {

	@Mock
	private ComunicadosRepository comunicadosRepository;

	@Mock
	private IComunicadosQueryService comunicadosQueryService;

	@Mock
	private UsuarioQueryService usuarioQueryService;

	@Mock
	private SecurityContext securityContext;

	@Mock
	private Authentication authentication;

	@InjectMocks
	private ComunicadosService comunicadosService;

	private Comunicados comunicado;
	private Usuario usuario;

	@BeforeEach
	void setUp() {
		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setPermissao(Permissao.ADMIN);

		comunicado = new Comunicados();
		comunicado.setId(1L);
		comunicado.setTitulo("Aviso Importante");
		comunicado.setDescricao("Comunicado sobre manutenção do sistema");
		comunicado.setDataPostagem(LocalDate.now());
		comunicado.setUsuario(usuario);
	}

	@Test
	@DisplayName("Deve salvar um novo comunicado com sucesso")
	void testSaveComunicadoSuccess() {
		// Arrange
		Comunicados novoComunicado = new Comunicados();
		novoComunicado.setTitulo("Aviso Importante");
		novoComunicado.setDescricao("Comunicado sobre manutenção do sistema");

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(comunicadosRepository.save(any(Comunicados.class))).thenReturn(comunicado);

		// Act
		Comunicados resultado = comunicadosService.save(novoComunicado);

		// Assert
		assertNotNull(resultado);
		assertEquals("Aviso Importante", resultado.getTitulo());
		assertEquals("Comunicado sobre manutenção do sistema", resultado.getDescricao());
		assertEquals(usuario, resultado.getUsuario());
		verify(usuarioQueryService, times(1)).findById(1L);
		verify(comunicadosRepository, times(1)).save(any(Comunicados.class));
	}

	@Test
	@DisplayName("Deve atualizar um comunicado com sucesso")
	void testUpdateComunicadoSuccess() {
		// Arrange
		Comunicados comunicadoAtualizado = new Comunicados();
		comunicadoAtualizado.setTitulo("Aviso Atualizado");
		comunicadoAtualizado.setDescricao("Comunicado atualizado");

		when(comunicadosQueryService.findById(1L)).thenReturn(comunicado);
		when(comunicadosRepository.save(any(Comunicados.class))).thenReturn(comunicadoAtualizado);

		// Act
		Comunicados resultado = comunicadosService.update(1L, comunicadoAtualizado);

		// Assert
		assertNotNull(resultado);
		assertEquals("Aviso Atualizado", resultado.getTitulo());
		assertEquals("Comunicado atualizado", resultado.getDescricao());
		verify(comunicadosQueryService, times(1)).findById(1L);
		verify(comunicadosRepository, times(1)).save(any(Comunicados.class));
	}

	@Test
	@DisplayName("Deve deletar um comunicado com sucesso")
	void testDeleteComunicadoSuccess() {
		// Arrange
		when(comunicadosQueryService.findById(1L)).thenReturn(comunicado);
		doNothing().when(comunicadosRepository).deleteById(1L);

		// Act
		comunicadosService.delete(1L);

		// Assert
		verify(comunicadosQueryService, times(1)).findById(1L);
		verify(comunicadosRepository, times(1)).deleteById(1L);
	}

}
