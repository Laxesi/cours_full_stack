package org.polytech.spring;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FilmsService {

    private final FilmsRepository filmsRepository;
    private final ActeurRepository acteurRepository;

    public FilmsService(FilmsRepository filmsRepository, ActeurRepository acteurRepository){
        this.filmsRepository = filmsRepository;
        this.acteurRepository = acteurRepository;
    }

    public List<FilmDto> getAll(){
        return filmsRepository.findAll().stream().map(film -> FilmMapper.toDto(film)).toList();
    }

    @Transactional(readOnly = true)
    public FilmDetailDto  get(Long id){
        Film film = filmsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé"));
        return FilmMapper.toDetailDto(film);
    }

    public FilmDto put(FilmCreationDto filmDto){
        Film film = filmsRepository.save(FilmMapper.toEntity(filmDto));
        return FilmMapper.toDto(film);
    }

    @Transactional
    public FilmDto update(Long id, FilmCreationDto filmCreationDto) {
        Film film = filmsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé"));
        film.setTitre(filmCreationDto.titre());
        film.setRealisateur(filmCreationDto.realisateur());
        film.setDateSortie(filmCreationDto.dateSortie());
        film.setGenre(filmCreationDto.genre());
        return FilmMapper.toDto(filmsRepository.save(film));
    }

    @Transactional
    public void delete(Long id) {
        if (!filmsRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé");
        }
        filmsRepository.deleteById(id);
    }

    public List<ActeurDto> getActeurs(Long id) {
        if (!filmsRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé");
        }
        return acteurRepository.findByFilmsId(id).stream().map(acteur -> ActeurMapper.toDto(acteur)).toList();
    }

    @Transactional
    public void associer(Long id, Long acteurId) {
        Film film = filmsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé"));
        Acteur acteur = acteurRepository.findById(acteurId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé"));
        film.ajouterActeur(acteur);
    }

    @Transactional
    public void dissocier(Long id, Long acteurId) {
        Film film = filmsRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvé"));
        Acteur acteur = acteurRepository.findById(acteurId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acteur non trouvé"));
        film.supprimerActeur(acteur);
    }
}
