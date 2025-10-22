package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.ComunicadosDto;
import com.conecta.brenannd.entity.Comunicados;

@Mapper(componentModel = "spring")
public interface IComunicadosMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "usuario.id", source = "usuarioId")
	Comunicados toEntity(ComunicadosDto dto);

	@Mapping(target = "usuarioId", source = "usuario.id")
	ComunicadosDto toDto(Comunicados entity);

	List<Comunicados> toDtoList(List<Comunicados> entities);
	
}
