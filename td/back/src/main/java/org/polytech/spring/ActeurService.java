package org.polytech.spring;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@Service
public class ActeurService {

    private final ActeurRepository acteurRepository;
    private final FilmsRepository filmsRepository;

    public ActeurService(ActeurRepository acteurRepository, FilmsRepository filmsRepository) {
        this.acteurRepository = acteurRepository;
        this.filmsRepository = filmsRepository;
    }

    public List<ActeurDto> getAll() {
        return acteurRepository.findAll().stream().map(acteur -> ActeurMapper.toDto(acteur)).toList();
    }

    public ActeurDto get(Long id) {
        return ActeurMapper.toDto(acteurRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé")));
    }

    @Transactional
    public ActeurDto put(ActeurCreationDto acteurCreationDto) {
        Acteur acteur = acteurRepository.save(ActeurMapper.toEntity(acteurCreationDto));
        return ActeurMapper.toDto(acteur);
    }

    @Transactional
    public ActeurDto update(Long id, ActeurCreationDto acteurCreationDto) {
        Acteur acteur = acteurRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé"));
        acteur.setNom(acteurCreationDto.nom());
        acteur.setPrenom(acteurCreationDto.prenom());
        acteur.setDateNaissance(acteurCreationDto.dateNaissance());
        return ActeurMapper.toDto(acteurRepository.save(acteur));
    }

    @Transactional
    public void delete(Long id) {
        Acteur acteur = acteurRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé"));
        for (Film film : new HashSet<>(acteur.getFilms())) {
            film.supprimerActeur(acteur);
        }
        acteurRepository.delete(acteur);
    }

    public List<FilmDto> getFilms(Long id) {
        if (!acteurRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé");
        }
        return filmsRepository.findFilmsByActeur(id).stream().map(film -> FilmMapper.toDto(film)).toList();
    }
}
