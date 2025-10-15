package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.DependenteDto;
import com.conecta.brenannd.entity.Dependente;

@Mapper(componentModel = "spring")
public interface IDependentesMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "usuario.id", source = "usuarioId")
	Dependente toEntity(DependenteDto dto);

	@Mapping(target = "usuarioId", source = "usuario.id")
	DependenteDto toDto(Dependente entity);

	List<DependenteDto> toDtoList(List<Dependente> entities);

}
