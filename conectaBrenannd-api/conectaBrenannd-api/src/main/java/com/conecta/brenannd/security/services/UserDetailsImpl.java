package com.conecta.brenannd.security.services;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.conecta.brenannd.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String username;
	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public static UserDetailsImpl build(Usuario user) {
	    GrantedAuthority authority = new SimpleGrantedAuthority(user.getPermissao().name());
	    List<GrantedAuthority> authorities = List.of(authority);

	    return new UserDetailsImpl(
	        user.getId(),
	        user.getNome(),
	        user.getEmail(),
	        user.getSenha(),
	        authorities
	    );
	}
	
	public String getPermissao() {
	    return authorities.stream()
	        .findFirst()
	        .map(GrantedAuthority::getAuthority)
	        .orElse(null);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
