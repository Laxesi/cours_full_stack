package org.polytech.spring;

public final class FilmMapper {

    public static FilmDto toDto(Film film){
        return new FilmDto(
                film.getId(),
                film.getTitre(),
                film.getRealisateur(),
                film.getDateSortie(),
                film.getGenre()
        );
    }

    public static Film toEntity(FilmCreationDto filmDto){
        return new Film(
                filmDto.titre(),
                filmDto.realisateur(),
                filmDto.dateSortie(),
                filmDto.genre()
        );
    }

    public static FilmDetailDto toDetailDto(Film film) {
        return new FilmDetailDto(
                film.getId(),
                film.getTitre(),
                film.getRealisateur(),
                film.getDateSortie(),
                film.getGenre(),
                film.getActeurs().stream().map(acteur -> ActeurMapper.toDto(acteur)).toList()
        );
    }

}
