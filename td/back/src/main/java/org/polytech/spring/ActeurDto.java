package org.polytech.spring;

import java.time.LocalDate;

public record ActeurDto(
        Long id,
        String nom,
        String prenom,
        LocalDate dateNaissance
) {}