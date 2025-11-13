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

import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.enums.TipoGrupo;
import com.conecta.brenannd.repository.GrupoRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IGrupoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("GrupoService Tests")
class GrupoServiceTest {

	@Mock
	private GrupoRepository grupoRepository;

	@Mock
	private IGrupoQueryService grupoQueryService;

	@Mock
	private UsuarioQueryService usuarioQueryService;

	@Mock
	private SecurityContext securityContext;

	@Mock
	private Authentication authentication;

	@InjectMocks
	private GrupoService grupoService;

	private Grupo grupo;
	private Usuario usuario;

	@BeforeEach
	void setUp() {
		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setPermissao(Permissao.VISITANTE);

		grupo = new Grupo();
		grupo.setId(1L);
		grupo.setNome("Amigos Próximos");
		grupo.setTipoGrupo(TipoGrupo.AMIGOS);
		grupo.setUsuario(usuario);
	}

	@Test
	@DisplayName("Deve salvar um novo grupo com sucesso")
	void testSaveGrupoSuccess() {
		// Arrange
		Grupo novoGrupo = new Grupo();
		novoGrupo.setNome("Amigos Próximos");
		novoGrupo.setTipoGrupo(TipoGrupo.AMIGOS);

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(grupoRepository.save(any(Grupo.class))).thenReturn(grupo);

		// Act
		Grupo resultado = grupoService.save(novoGrupo);

		// Assert
		assertNotNull(resultado);
		assertEquals("Amigos Próximos", resultado.getNome());
		assertEquals(TipoGrupo.AMIGOS, resultado.getTipoGrupo());
		assertEquals(usuario, resultado.getUsuario());
		verify(usuarioQueryService, times(1)).findById(1L);
		verify(grupoRepository, times(1)).save(any(Grupo.class));
	}

	@Test
	@DisplayName("Deve atualizar um grupo com sucesso")
	void testUpdateGrupoSuccess() {
		// Arrange
		Grupo grupoAtualizado = new Grupo();
		grupoAtualizado.setNome("Amigos Distantes");
		grupoAtualizado.setTipoGrupo(TipoGrupo.ESCOLAR);

		when(grupoQueryService.findById(1L)).thenReturn(grupo);
		when(grupoRepository.save(any(Grupo.class))).thenReturn(grupoAtualizado);

		// Act
		Grupo resultado = grupoService.update(1L, grupoAtualizado);

		// Assert
		assertNotNull(resultado);
		assertEquals("Amigos Distantes", resultado.getNome());
		assertEquals(TipoGrupo.ESCOLAR, resultado.getTipoGrupo());
		verify(grupoQueryService, times(1)).findById(1L);
		verify(grupoRepository, times(1)).save(any(Grupo.class));
	}

	@Test
	@DisplayName("Deve deletar um grupo com sucesso")
	void testDeleteGrupoSuccess() {
		// Arrange
		when(grupoQueryService.findById(1L)).thenReturn(grupo);
		doNothing().when(grupoRepository).deleteById(1L);

		// Act
		grupoService.delete(1L);

		// Assert
		verify(grupoQueryService, times(1)).findById(1L);
		verify(grupoRepository, times(1)).deleteById(1L);
	}

}
