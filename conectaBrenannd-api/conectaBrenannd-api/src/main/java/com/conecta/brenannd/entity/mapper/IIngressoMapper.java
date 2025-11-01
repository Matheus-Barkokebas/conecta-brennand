package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.IngressoDto;
import com.conecta.brenannd.entity.Ingresso;

@Mapper(componentModel = "spring")
public interface IIngressoMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "usuario.id", source = "usuarioId")
	Ingresso toEntity(IngressoDto dto);

	@Mapping(target = "usuarioId", source = "usuario.id")
	IngressoDto toDto(Ingresso entity);

	List<IngressoDto> toDtoList(List<Ingresso> entities);

}
