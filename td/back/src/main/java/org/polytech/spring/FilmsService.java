package org.polytech.spring;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FilmsService {

    private final FilmsRepository filmsRepository;

    public FilmsService(FilmsRepository filmsRepository){
        this.filmsRepository = filmsRepository;
    }

    public FilmsService(){
        filmsRepository = new FilmsRepository();
    }

    public List<Film> getAll(){
        return filmsRepository.getAll();
    }

    public Film get(Long id){
        Film film = filmsRepository.get(id);
        if (film == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Film non trouvée");
        }
        return film;
    }

    public void put(Film film){
        filmsRepository.put(film);
    }

    public Film update(Long id, Film film) {
        get(id);
        film.setId(id);
        filmsRepository.replace(film);
        return film;
    }

    public void delete(Long id) {
        get(id);
        filmsRepository.remove(id);
    }
}
