package com.conecta.brenannd.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.conecta.brenannd.controller.dto.UsuarioDto;
import com.conecta.brenannd.entity.Usuario;
import com.conecta.brenannd.entity.enums.Permissao;
import com.conecta.brenannd.entity.mapper.IUsuarioMapper;
import com.conecta.brenannd.service.impl.UsuarioService;
import com.conecta.brenannd.service.query.impl.UsuarioQueryService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(UsuarioController.class)
@DisplayName("UsuarioController Tests")
class UsuarioControllerTest {

	@Autowired
	private MockMvc mockMvc;

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
		usuarioDtoRequest = new UsuarioDto();
		usuarioDtoRequest.setNome("João Silva");
		usuarioDtoRequest.setEmail("joao@example.com");
		usuarioDtoRequest.setSenha("senha123");
		usuarioDtoRequest.setCpf("123.456.789-00");
		usuarioDtoRequest.setTelefone("11999999999");
		usuarioDtoRequest.setDataNascimento(LocalDate.of(1990, 5, 15));
		usuarioDtoRequest.setEndereco("Rua A, 123");
		usuarioDtoRequest.setCidade("São Paulo");
		usuarioDtoRequest.setEstado("SP");
		usuarioDtoRequest.setCep("01310-100");
		usuarioDtoRequest.setPermissao(Permissao.VISITANTE);

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

		usuarioDtoResponse = new UsuarioDto();
		usuarioDtoResponse.setId(1L);
		usuarioDtoResponse.setNome("João Silva");
		usuarioDtoResponse.setEmail("joao@example.com");
		usuarioDtoResponse.setSenha("senha123");
		usuarioDtoResponse.setCpf("123.456.789-00");
		usuarioDtoResponse.setTelefone("11999999999");
		usuarioDtoResponse.setDataNascimento(LocalDate.of(1990, 5, 15));
		usuarioDtoResponse.setEndereco("Rua A, 123");
		usuarioDtoResponse.setCidade("São Paulo");
		usuarioDtoResponse.setEstado("SP");
		usuarioDtoResponse.setCep("01310-100");
		usuarioDtoResponse.setPermissao(Permissao.VISITANTE);
	}

	@Test
	@DisplayName("POST /usuarios - Deve criar um novo usuário com sucesso")
	void testSaveUsuarioSuccess() throws Exception {
		// Arrange
		when(usuarioMapper.toEntity(any(UsuarioDto.class))).thenReturn(usuario);
		when(usuarioService.save(any(Usuario.class))).thenReturn(usuario);
		when(usuarioMapper.toDto(any(Usuario.class))).thenReturn(usuarioDtoResponse);

		String usuarioDtoJson = objectMapper.writeValueAsString(usuarioDtoRequest);

		// Act & Assert
		ResultActions result = mockMvc.perform(post("/usuarios").contentType(MediaType.APPLICATION_JSON)
				.content(usuarioDtoJson));

		result.andExpect(status().isCreated()).andExpect(jsonPath("$.id").value(1L))
				.andExpect(jsonPath("$.nome").value("João Silva"))
				.andExpect(jsonPath("$.email").value("joao@example.com"));

		verify(usuarioMapper, times(1)).toEntity(any(UsuarioDto.class));
		verify(usuarioService, times(1)).save(any(Usuario.class));
		verify(usuarioMapper, times(1)).toDto(any(Usuario.class));
	}

	@Test
	@DisplayName("PUT /usuarios/{id} - Deve atualizar um usuário com sucesso")
	void testUpdateUsuarioSuccess() throws Exception {
		// Arrange
		UsuarioDto usuarioDtoAtualizado = new UsuarioDto();
		usuarioDtoAtualizado.setNome("João Silva Atualizado");
		usuarioDtoAtualizado.setEmail("joao.atualizado@example.com");
		usuarioDtoAtualizado.setSenha("novaSenha123");
		usuarioDtoAtualizado.setCpf("987.654.321-00");
		usuarioDtoAtualizado.setPermissao(Permissao.ADMIN);

		Usuario usuarioAtualizado = new Usuario();
		usuarioAtualizado.setId(1L);
		usuarioAtualizado.setNome("João Silva Atualizado");
		usuarioAtualizado.setEmail("joao.atualizado@example.com");
		usuarioAtualizado.setSenha("novaSenha123");
		usuarioAtualizado.setCpf("987.654.321-00");
		usuarioAtualizado.setPermissao(Permissao.ADMIN);

		when(usuarioMapper.toEntity(any(UsuarioDto.class))).thenReturn(usuarioAtualizado);
		when(usuarioService.update(eq(1L), any(Usuario.class))).thenReturn(usuarioAtualizado);
		when(usuarioMapper.toDto(any(Usuario.class))).thenReturn(usuarioDtoAtualizado);

		String usuarioDtoJson = objectMapper.writeValueAsString(usuarioDtoAtualizado);

		// Act & Assert
		mockMvc.perform(put("/usuarios/{id}", 1L).contentType(MediaType.APPLICATION_JSON).content(usuarioDtoJson))
				.andExpect(status().isOk()).andExpect(jsonPath("$.nome").value("João Silva Atualizado"))
				.andExpect(jsonPath("$.permissao").value("ADMIN"));

		verify(usuarioService, times(1)).update(eq(1L), any(Usuario.class));
	}

	@Test
	@DisplayName("DELETE /usuarios/{id} - Deve deletar um usuário com sucesso")
	void testDeleteUsuarioSuccess() throws Exception {
		// Arrange
		doNothing().when(usuarioService).delete(1L);

		// Act & Assert
		mockMvc.perform(delete("/usuarios/{id}", 1L)).andExpect(status().isNoContent());

		verify(usuarioService, times(1)).delete(1L);
	}

	@Test
	@DisplayName("GET /usuarios/{id} - Deve recuperar um usuário por ID com sucesso")
	void testFindByIdSuccess() throws Exception {
		// Arrange
		when(usuarioQueryService.findById(1L)).thenReturn(usuario);
		when(usuarioMapper.toDto(any(Usuario.class))).thenReturn(usuarioDtoResponse);

		// Act & Assert
		mockMvc.perform(get("/usuarios/{id}", 1L)).andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1L)).andExpect(jsonPath("$.nome").value("João Silva"))
				.andExpect(jsonPath("$.email").value("joao@example.com"));

		verify(usuarioQueryService, times(1)).findById(1L);
		verify(usuarioMapper, times(1)).toDto(any(Usuario.class));
	}

	@Test
	@DisplayName("GET /usuarios/cpf/{cpf} - Deve recuperar um usuário por CPF com sucesso")
	void testFindByCpfSuccess() throws Exception {
		// Arrange
		when(usuarioQueryService.findByCpf("123.456.789-00")).thenReturn(usuario);
		when(usuarioMapper.toDto(any(Usuario.class))).thenReturn(usuarioDtoResponse);

		// Act & Assert
		mockMvc.perform(get("/usuarios/cpf/{cpf}", "123.456.789-00")).andExpect(status().isOk())
				.andExpect(jsonPath("$.cpf").value("123.456.789-00"))
				.andExpect(jsonPath("$.nome").value("João Silva"));

		verify(usuarioQueryService, times(1)).findByCpf("123.456.789-00");
	}

	@Test
	@DisplayName("GET /usuarios - Deve listar todos os usuários com sucesso")
	void testListUsuariosSuccess() throws Exception {
		// Arrange
		Usuario usuario2 = new Usuario();
		usuario2.setId(2L);
		usuario2.setNome("Maria Santos");
		usuario2.setEmail("maria@example.com");
		usuario2.setCpf("987.654.321-00");
		usuario2.setPermissao(Permissao.ADMIN);

		UsuarioDto usuarioDtoResponse2 = new UsuarioDto();
		usuarioDtoResponse2.setId(2L);
		usuarioDtoResponse2.setNome("Maria Santos");
		usuarioDtoResponse2.setEmail("maria@example.com");
		usuarioDtoResponse2.setCpf("987.654.321-00");
		usuarioDtoResponse2.setPermissao(Permissao.ADMIN);

		List<Usuario> usuarios = Arrays.asList(usuario, usuario2);
		List<UsuarioDto> usuariosDto = Arrays.asList(usuarioDtoResponse, usuarioDtoResponse2);

		when(usuarioQueryService.list()).thenReturn(usuarios);
		when(usuarioMapper.toDtoList(usuarios)).thenReturn(usuariosDto);

		// Act & Assert
		mockMvc.perform(get("/usuarios")).andExpect(status().isOk()).andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$[0].id").value(1L)).andExpect(jsonPath("$[0].nome").value("João Silva"))
				.andExpect(jsonPath("$[1].id").value(2L)).andExpect(jsonPath("$[1].nome").value("Maria Santos"));

		verify(usuarioQueryService, times(1)).list();
		verify(usuarioMapper, times(1)).toDtoList(usuarios);
	}

}
