package org.polytech.spring;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Acteur {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable=false, length=200)
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @Column(nullable=false, length=200)
    @NotBlank(message = "Le prenom est obligatoire")
    private String prenom;

    @Column(nullable=false)
    @NotNull(message = "La date de naissance est obligatoire")
    private LocalDate dateNaissance;

    @ManyToMany(mappedBy = "acteurs")
    private Set<Film> films = new HashSet<>();

    public Acteur(){}

    public Acteur(Long id, String nom, String prenom, LocalDate dateNaissance){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
    }

    public Acteur(String nom, String prenom, LocalDate dateNaissance){
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Set<Film> getFilms() {
        return films;
    }

    public void setFilms(Set<Film> films) {
        this.films = films;
    }
}
