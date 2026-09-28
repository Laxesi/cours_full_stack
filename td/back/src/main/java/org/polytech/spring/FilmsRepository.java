package org.polytech.spring;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

@Repository
public class FilmsRepository {

    private final TreeMap<Long, Film> films;

    public FilmsRepository(){
        films = new TreeMap<>();
    }

    public List<Film> getAll(){
        return new ArrayList<>(films.values());
    }

    public Film get(Long id){
        return films.get(id);
    }

    public void put(Film film){
        long newId = 1;
        if (!films.isEmpty()) {
            newId = films.lastEntry().getKey() + 1;
        }
        film.setId(newId);
        films.put(newId, film);
    }

    public void remove(Long id){
        films.remove(id);
    }

    public void replace(Film film){
        films.put(film.getId(), film);
    }
}
