package org.polytech.spring;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record FilmCreationDto(
        @NotBlank(message = "Le titre est obligatoire")
        String titre,
        @NotBlank(message = "Le réalisateur est obligatoire")
        String realisateur,
        @NotNull(message = "La date de sortie est obligatoire")
        LocalDate dateSortie,
        @NotNull(message = "Le genre est obligatoire")
        Film.Genre genre
) {
}
