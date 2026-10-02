package org.polytech.spring;

import java.time.LocalDate;
import java.util.List;

public record FilmDetailDto(
        Long id,
        String titre,
        String realisateur,
        LocalDate dateSortie,
        Film.Genre genre,
        List<ActeurDto> acteurs
) {}