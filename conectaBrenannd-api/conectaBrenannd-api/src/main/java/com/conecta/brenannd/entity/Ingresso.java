package com.conecta.brenannd.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.conecta.brenannd.entity.enums.StatusIngresso;

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
@Table(name = "tb_ingressos")
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingresso", nullable = false, unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    @Column(name = "cpf_token", nullable = false, length = 14)
    private String cpfToken;

    @Column(name = "tipo_ingresso", length = 50)
    private String tipoIngresso = "Gratuito";

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private StatusIngresso status = StatusIngresso.ATIVO;

    @Column(name = "data_emissao")
    private LocalDate dataEmissao;

    @Column(name = "data_utilizacao")
    private LocalDate dataUtilizacao;
}
