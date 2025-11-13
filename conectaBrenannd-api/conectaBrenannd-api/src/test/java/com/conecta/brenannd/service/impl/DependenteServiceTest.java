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

import com.conecta.brenannd.entity.Dependente;
import com.conecta.brenannd.entity.Grupo;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.enums.TipoGrupo;
import com.conecta.brenannd.repository.DependentesRepository;
import com.conecta.brenannd.security.services.UserDetailsImpl;
import com.conecta.brenannd.service.query.IDependenteQueryService;
import com.conecta.brenannd.service.query.impl.GrupoQueryService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;

@ExtendWith(MockitoExtension.class)
@DisplayName("DependenteService Tests")
class DependenteServiceTest {

	@Mock
	private DependentesRepository dependentesRepository;

	@Mock
	private IDependenteQueryService dependenteQueryService;

	@Mock
	private UsuarioQueryService usuarioQueryService;

	@Mock
	private GrupoQueryService grupoQueryService;

	@Mock
	private SecurityContext securityContext;

	@Mock
	private Authentication authentication;

	@InjectMocks
	private DependenteService dependenteService;

	private Dependente dependente;
	private Usuario usuario;
	private Grupo grupo;

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

		dependente = new Dependente();
		dependente.setId(1L);
		dependente.setNome("Pedro Silva");
		dependente.setIdade(10);
		dependente.setParentesco("Filho");
		dependente.setGrupo(grupo);
		dependente.setUsuario(usuario);
	}

	@Test
	@DisplayName("Deve salvar um novo dependente com sucesso")
	void testSaveDependenteSuccess() {
		// Arrange
		Dependente novoDependente = new Dependente();
		novoDependente.setNome("Pedro Silva");
		novoDependente.setIdade(10);
		novoDependente.setParentesco("Filho");
		novoDependente.setGrupo(grupo);

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(grupoQueryService.findById(1L)).thenReturn(grupo);
		when(dependentesRepository.save(any(Dependente.class))).thenReturn(dependente);

		// Act
		Dependente resultado = dependenteService.save(novoDependente);

		// Assert
		assertNotNull(resultado);
		assertEquals("Pedro Silva", resultado.getNome());
		assertEquals(10, resultado.getIdade());
		assertEquals(usuario, resultado.getUsuario());
		assertEquals(grupo, resultado.getGrupo());
		verify(usuarioQueryService, times(1)).findById(1L);
		verify(grupoQueryService, times(1)).findById(1L);
		verify(dependentesRepository, times(1)).save(any(Dependente.class));
	}

	@Test
	@DisplayName("Deve lançar exceção ao tentar salvar dependente sem grupo")
	void testSaveDependenteSemGrupoThrowsException() {
		// Arrange
		Dependente novoDependente = new Dependente();
		novoDependente.setNome("Pedro Silva");
		novoDependente.setIdade(10);
		novoDependente.setParentesco("Filho");

		UserDetailsImpl userDetails = new UserDetailsImpl(1L, "joao", "joao@example.com", "senha123", "123.456.789-00", null);

		SecurityContextHolder.setContext(securityContext);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		when(authentication.getPrincipal()).thenReturn(userDetails);
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);

		// Act & Assert
		assertThrows(IllegalArgumentException.class, () -> dependenteService.save(novoDependente));
		verify(usuarioQueryService, times(1)).findById(1L);
		verify(dependentesRepository, never()).save(any(Dependente.class));
	}

	@Test
	@DisplayName("Deve atualizar um dependente com sucesso")
	void testUpdateDependenteSuccess() {
		// Arrange
		Dependente dependenteAtualizado = new Dependente();
		dependenteAtualizado.setNome("Pedro Silva Atualizado");
		dependenteAtualizado.setIdade(11);

		when(dependenteQueryService.findById(1L)).thenReturn(dependente);
		when(dependentesRepository.save(any(Dependente.class))).thenReturn(dependenteAtualizado);

		// Act
		Dependente resultado = dependenteService.update(1L, dependenteAtualizado);

		// Assert
		assertNotNull(resultado);
		assertEquals("Pedro Silva Atualizado", resultado.getNome());
		assertEquals(11, resultado.getIdade());
		verify(dependenteQueryService, times(1)).findById(1L);
		verify(dependentesRepository, times(1)).save(any(Dependente.class));
	}

	@Test
	@DisplayName("Deve deletar um dependente com sucesso")
	void testDeleteDependenteSuccess() {
		// Arrange
		when(dependenteQueryService.findById(1L)).thenReturn(dependente);
		doNothing().when(dependentesRepository).deleteById(1L);

		// Act
		dependenteService.delete(1L);

		// Assert
		verify(dependenteQueryService, times(1)).findById(1L);
		verify(dependentesRepository, times(1)).deleteById(1L);
	}

}
