package org.polytech.spring;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/acteurs")
public class ActeurController {

    private final ActeurService acteurService;

    public ActeurController(ActeurService acteurService) {
        this.acteurService = acteurService;
    }

    @GetMapping
    public List<ActeurDto> getAll() {
        return acteurService.getAll();
    }

    @GetMapping("/{id}")
    public ActeurDetailDto get(@PathVariable Long id) {
        return acteurService.get(id);
    }

    @PostMapping
    public ResponseEntity<ActeurDto> put(@Valid @RequestBody ActeurCreationDto acteurCreationDto) {
        ActeurDto created = acteurService.put(acteurCreationDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ActeurDto update(@PathVariable Long id, @Valid @RequestBody ActeurCreationDto acteurCreationDto) {
        return acteurService.update(id, acteurCreationDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        acteurService.delete(id);
    }

    @GetMapping("/{id}/films")
    public List<FilmDto> getFilms(@PathVariable Long id) {
        return acteurService.getFilms(id);
    }
}
