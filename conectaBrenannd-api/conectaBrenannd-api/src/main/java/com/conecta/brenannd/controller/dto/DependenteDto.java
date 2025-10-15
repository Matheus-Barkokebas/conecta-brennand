package com.conecta.brenannd.controller.dto;

import com.conecta.brenannd.entity.Grupo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DependenteDto {

    private Long id;
    private String nome;
    private Integer idade;
    private String parentesco;
    private String cpf;
    private Grupo grupo;
    private Long usuarioId;

}
