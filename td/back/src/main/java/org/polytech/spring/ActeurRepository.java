package org.polytech.spring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActeurRepository extends JpaRepository<Acteur, Long> {

    List<Acteur> findByFilmsId(Long filmId);

    @Query("SELECT a FROM Acteur a JOIN a.films f WHERE f.id = :filmId")
    List<Acteur> findActeursByFilm(@Param("filmId") Long filmId);
}
