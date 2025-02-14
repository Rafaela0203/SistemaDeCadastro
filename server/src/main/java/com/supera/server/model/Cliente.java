package com.supera.server.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cliente")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Cliente {
    //    Nome do cliente, CPF e WhatsApp.
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String nome;
    private String cpf;
    private String telefone;
}
