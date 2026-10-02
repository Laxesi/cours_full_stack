package org.polytech.spring;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

@Entity
public class Film {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable=false, length=200)
    private String titre;

    @Column(nullable=false, length=200)
    private String realisateur;

    @Column(nullable=false)
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

    @Column(nullable=false)
    private Genre genre;

    @ManyToMany
    @JoinTable(
            name = "film_acteur",
            joinColumns = @JoinColumn(name = "film_id"),
            inverseJoinColumns = @JoinColumn(name = "acteur_id")
    )
    private Set<Acteur> acteurs = new HashSet<>();

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

    public Set<Acteur> getActeurs() {
        return acteurs;
    }

    public void setActeurs(Set<Acteur> acteurs) {
        this.acteurs = acteurs;
    }

    public void ajouterActeur(Acteur acteur){
        this.acteurs.add(acteur);
        acteur.getFilms().add(this);
    }

    public void supprimerActeur(Acteur acteur){
        this.acteurs.remove(acteur);
        acteur.getFilms().remove(this);
    }
}
