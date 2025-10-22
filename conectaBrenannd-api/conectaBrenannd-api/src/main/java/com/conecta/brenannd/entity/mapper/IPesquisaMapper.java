package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.PesquisaDto;
import com.conecta.brenannd.entity.Pesquisa;

@Mapper(componentModel = "spring")
public interface IPesquisaMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "usuario.id", source = "usuarioId")
	Pesquisa toEntity(PesquisaDto dto);

	@Mapping(target = "usuarioId", source = "usuario.id")
	PesquisaDto toDto(Pesquisa entity);

	List<Pesquisa> toDtoList(List<Pesquisa> entities);

}
