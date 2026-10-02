package org.polytech.spring;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmsController {

    private final FilmsService filmsService;

    public FilmsController(FilmsService filmsService) {
        this.filmsService = filmsService;
    }

    @GetMapping
    public List<FilmDto> getAll(){
        return filmsService.getAll();
    }

    @GetMapping("/{id}")
    public FilmDetailDto get(@PathVariable Long id){
        return filmsService.get(id);
    }

    @PostMapping
    public ResponseEntity<FilmDto> put(@Valid @RequestBody FilmCreationDto filmDto){
        FilmDto filmCreated = filmsService.put(filmDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(filmCreated.id())
                .toUri();
        return ResponseEntity.created(location).body(filmCreated);
    }

    @PutMapping("/{id}")
    public FilmDto update(@PathVariable Long id, @Valid @RequestBody FilmCreationDto filmCreationDto) {
        return filmsService.update(id, filmCreationDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        filmsService.delete(id);
    }

    @GetMapping("/{id}/acteurs")
    public List<ActeurDto> getActeurs(@PathVariable Long id) {
        return filmsService.getActeurs(id);
    }

    @PostMapping("/{id}/acteurs/{acteurId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void associer(@PathVariable Long id, @PathVariable Long acteurId) {
        filmsService.associer(id, acteurId);
    }

    @DeleteMapping("/{id}/acteurs/{acteurId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void dissocier(@PathVariable Long id, @PathVariable Long acteurId) {
        filmsService.dissocier(id, acteurId);
    }
}
