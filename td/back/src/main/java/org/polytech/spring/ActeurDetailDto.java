package org.polytech.spring;

import java.time.LocalDate;
import java.util.List;

public record ActeurDetailDto(
        Long id,
        String nom,
        String prenom,
        LocalDate dateNaissance,
        List<FilmDto> films
) {}