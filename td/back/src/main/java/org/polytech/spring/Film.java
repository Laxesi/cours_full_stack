package org.polytech.spring;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public class Film {

    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "Le réalisateur est obligatoire")
    private String realisateur;

    @NotNull(message = "La date de sortie est obligatoire")
    private LocalDate dateSortie;

    public enum Genre {
        ACTION,
        COMEDIE,
        HORREUR,
        THRILLER,
        FANTASTIQUE,
        FAMILIAL,
        DOCUMENTAIRE,
        SCIENCE_FICTION
    }

    @NotNull(message = "Le genre est obligatoire")
    private Genre genre;

    public Film(){}

    public Film(Long id, String titre, String realisateur, LocalDate dateSortie, Genre genre){
        this.id = id;
        this.titre = titre;
        this.realisateur = realisateur;
        this.dateSortie = dateSortie;
        this.genre = genre;
    }

    public Film(String titre, String realisateur, LocalDate dateSortie, Genre genre){
        this.titre = titre;
        this.realisateur = realisateur;
        this.dateSortie = dateSortie;
        this.genre = genre;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getTitre(){
        return titre;
    }

    public void setTitre(String titre){
        this.titre = titre;
    }

    public String getRealisateur() {
        return realisateur;
    }

    public void setRealisateur(String realisateur) {
        this.realisateur = realisateur;
    }

    public LocalDate getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(LocalDate dateSortie) {
        this.dateSortie = dateSortie;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }
}
