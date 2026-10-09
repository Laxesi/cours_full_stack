package org.polytech.spring;

public final class ActeurMapper {
    public static ActeurDto toDto(Acteur acteur){
        return new ActeurDto(
                acteur.getId(),
                acteur.getNom(),
                acteur.getPrenom(),
                acteur.getDateNaissance()
        );
    }

    public static Acteur toEntity(ActeurCreationDto acteurCreationDto) {
        return new Acteur(
                acteurCreationDto.nom(),
                acteurCreationDto.prenom(),
                acteurCreationDto.dateNaissance()
        );
    }

    public static ActeurDetailDto toDetailDto(Acteur acteur) {
        return new ActeurDetailDto(
                acteur.getId(),
                acteur.getNom(),
                acteur.getPrenom(),
                acteur.getDateNaissance(),
                acteur.getFilms().stream().map(film -> FilmMapper.toDto(film)).toList()
        );
    }
}
