package org.polytech.spring;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record ActeurCreationDto(
        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        @NotBlank(message = "Le prénom est obligatoire")
        String prenom,

        LocalDate dateNaissance
) {}