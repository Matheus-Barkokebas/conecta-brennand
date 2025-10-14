package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.GrupoDto;
import com.conecta.brenannd.entity.Grupo;

@Mapper(componentModel = "spring")
public interface IGrupoMapper {
	
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "usuario.id", source = "usuarioId")
	Grupo toEntity(GrupoDto dto);
	
	@Mapping(target = "usuarioId", source = "usuario.id")
	GrupoDto toDto(Grupo entity);
	
	List<GrupoDto> toDtoList(List<Grupo> entities);

}
