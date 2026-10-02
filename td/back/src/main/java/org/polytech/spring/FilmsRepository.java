package org.polytech.spring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

@Repository
public interface FilmsRepository extends JpaRepository<Film, Long> {

    List<Film> findByActeursId(Long acteursId);

    @Query("SELECT f FROM Film f JOIN f.acteurs a WHERE a.id = :acteurId")
    List<Film> findFilmsByActeur(@Param("acteurId") Long acteurId);
}
