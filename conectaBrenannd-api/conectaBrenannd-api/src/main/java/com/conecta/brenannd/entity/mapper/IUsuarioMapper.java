package com.conecta.brenannd.entity.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.conecta.brenannd.controller.dto.UsuarioDto;
import com.conecta.brenannd.entity.Usuario;

@Mapper(componentModel = "spring")
public interface IUsuarioMapper {
	
	@Mapping(target = "id", ignore = true)
	Usuario toEntity(UsuarioDto dto);
	
	UsuarioDto toDto(Usuario entity);
	
	List<UsuarioDto> toDtoList(List<Usuario> entities);
}
