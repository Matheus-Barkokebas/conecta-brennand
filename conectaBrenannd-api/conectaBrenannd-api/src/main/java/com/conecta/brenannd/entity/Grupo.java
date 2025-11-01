package com.conecta.brenannd.entity;

import com.conecta.brenannd.entity.enums.TipoGrupo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_grupos")
public class Grupo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_grupo")
	private Long id;

	@Column(name = "nome_grupo", nullable = false, length = 100)
	private String nome;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo", nullable = false)
	private TipoGrupo tipoGrupo = TipoGrupo.AMIGOS;

	@ManyToOne
	@JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
	private Usuario usuario;

}
