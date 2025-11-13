package com.conecta.brenannd.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import com.conecta.brenannd.controller.dto.UsuarioDto;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.mapper.IUsuarioMapper;
import com.conecta.brenannd.service.impl.UsuarioService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@DisplayName("UsuarioController Integration Tests")
class UsuarioControllerIntegrationTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private UsuarioService usuarioService;

	@MockBean
	private UsuarioQueryService usuarioQueryService;

	@MockBean
	private IUsuarioMapper usuarioMapper;

	private UsuarioDto usuarioDtoRequest;
	private Usuario usuario;
	private UsuarioDto usuarioDtoResponse;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

		usuarioDtoRequest = new UsuarioDto();
		usuarioDtoRequest.setNome("João Silva");
		usuarioDtoRequest.setEmail("joao@example.com");
		usuarioDtoRequest.setSenha("senha123");
		usuarioDtoRequest.setCpf("123.456.789-00");

		usuario = new Usuario();
		usuario.setId(1L);
		usuario.setNome("João Silva");
		usuario.setEmail("joao@example.com");
		usuario.setSenha("senha123");
		usuario.setCpf("123.456.789-00");
		usuario.setPermissao(Permissao.VISITANTE);

		usuarioDtoResponse = new UsuarioDto();
		usuarioDtoResponse.setId(1L);
		usuarioDtoResponse.setNome("João Silva");
		usuarioDtoResponse.setEmail("joao@example.com");
		usuarioDtoResponse.setCpf("123.456.789-00");
		usuarioDtoResponse.setPermissao(Permissao.VISITANTE);
	}

	@Test
	@DisplayName("GET /usuarios/{id} - Deve recuperar um usuário por ID")
	void testFindByIdSuccess() throws Exception {
		// Arrange
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(usuarioMapper.toDto(any(Usuario.class))).thenReturn(usuarioDtoResponse);

		// Act & Assert
		mockMvc.perform(get("/usuarios/{id}", 1L))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1L))
				.andExpect(jsonPath("$.nome").value("João Silva"));

		verify(usuarioQueryService, times(1)).findById(1L);
	}

	@Test
	@DisplayName("GET /usuarios - Deve listar todos os usuários")
	void testListUsuariosSuccess() throws Exception {
		// Arrange
		Usuario usuario2 = new Usuario();
		usuario2.setId(2L);
		usuario2.setNome("Maria Santos");

		UsuarioDto usuarioDtoResponse2 = new UsuarioDto();
		usuarioDtoResponse2.setId(2L);
		usuarioDtoResponse2.setNome("Maria Santos");

		List<Usuario> usuarios = Arrays.asList(usuario, usuario2);
		List<UsuarioDto> usuariosDto = Arrays.asList(usuarioDtoResponse, usuarioDtoResponse2);

		when(usuarioQueryService.list()).thenReturn(usuarios);
		when(usuarioMapper.toDtoList(usuarios)).thenReturn(usuariosDto);

		// Act & Assert
		mockMvc.perform(get("/usuarios"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$[0].id").value(1L))
				.andExpect(jsonPath("$[1].id").value(2L));

		verify(usuarioQueryService, times(1)).list();
	}

}
