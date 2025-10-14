package com.conecta.brenannd.controller.dto;

import com.conecta.brenannd.entity.enums.TipoGrupo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrupoDto {
	
    private Long id;
    private Long usuarioId;
    private String nome;
    private TipoGrupo tipoGrupo;

}
