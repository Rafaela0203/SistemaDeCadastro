package com.supera.server.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PersonDTO {
    private Long id;

    @NotNull
    private String name;

    @Column(unique = true)
    @NotNull
    private String cpf;

    @NotNull
    private String phone;
}
