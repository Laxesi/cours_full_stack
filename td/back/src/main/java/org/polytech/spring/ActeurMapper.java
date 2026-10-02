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
}
