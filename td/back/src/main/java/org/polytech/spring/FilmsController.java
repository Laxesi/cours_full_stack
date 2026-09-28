package org.polytech.spring;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmsController {

    private final FilmsService filmsService;

    public FilmsController(FilmsService filmsService) {
        this.filmsService = filmsService;
    }

    @GetMapping
    public List<Film> getAll(){
        return filmsService.getAll();
    }

    @GetMapping("/{id}")
    public Film get(@PathVariable Long id){
        return filmsService.get(id);
    }

    @PostMapping
    public String put(@Valid @RequestBody Film film){
        filmsService.put(film);
        return "success";
    }
    @PutMapping("/{id}")
    public Film update(@PathVariable Long id, @Valid @RequestBody Film film) {
        return filmsService.update(id, film);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        filmsService.delete(id);
    }
}
