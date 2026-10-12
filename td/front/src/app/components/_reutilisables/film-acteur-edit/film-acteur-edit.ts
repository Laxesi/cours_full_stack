import {Component, inject, input, output, signal} from '@angular/core';
import {Acteur} from '../../../models/acteur';
import {ActeurService} from '../../../services/acteur-service';
import {ActeurFormulaire} from '../acteur-formulaire/acteur-formulaire';
import {ActeurMakeList} from '../acteur-make-list/acteur-make-list';
import {AsyncPipe} from '@angular/common';
import {toObservable} from '@angular/core/rxjs-interop';
import {combineLatest, map} from 'rxjs';
import {Film} from '../../../models/film';
import {FilmService} from '../../../services/film-service';

@Component({
  imports: [
    ActeurFormulaire,
    ActeurMakeList,
    AsyncPipe
  ],
  selector: 'app-film-acteur-edit',
  styleUrl: './film-acteur-edit.css',
  templateUrl: './film-acteur-edit.html',
})
export class FilmActeurEdit {
  film = input.required<Film>()
  nuewFilm = output<Film>()
  close = output()

  acteurs$ = inject(ActeurService).getAll();
  filmActeurs$ = toObservable(this.film).pipe(map(f => f?.acteurs ?? []));

  recherche = signal<string>('');
  recherche$ = toObservable(this.recherche);

  filmService = inject(FilmService);

  acteursDisponibles$ = combineLatest([this.acteurs$, this.filmActeurs$, this.recherche$]).pipe(map(([acteurs, filmActeur, recherche]) => {
    const ids = filmActeur.map(a => a.id);
    const r = recherche.toLocaleLowerCase().trim();

    let disp = acteurs.filter(a => !ids.includes(a.id));

    if(r != ''){
      disp = disp.filter(a =>
        a.nom.toLocaleLowerCase().includes(r) ||
        a.prenom.toLocaleLowerCase().includes(r)
      )
    }

    return disp;
  }))

  acteursFiltree$ = combineLatest([this.filmActeurs$, this.recherche$]).pipe(map(([acteurs, recherche]) => {
    const r = recherche.toLocaleLowerCase().trim();

    if(r != ''){
      return acteurs.filter(a =>
        a.nom.toLocaleLowerCase().includes(r) ||
        a.prenom.toLocaleLowerCase().includes(r)
      )
    }

    return  acteurs
  }))

  rechercher(event: Event){
    const input = event.target as HTMLInputElement;
    this.recherche.set(input.value)
  }

  associee(acteur: Acteur, list: Acteur[]){
    this.filmService.postActeur(this.film().id, acteur.id).subscribe({
      next: (fait) => {
        console.log("acteur ajoutée");
        const nuewList = [...list, acteur];
        const nuewFilm: Film = {...this.film(), acteurs: nuewList};
        this.nuewFilm.emit(nuewFilm);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  dissociee(acteur: Acteur, list: Acteur[]){
    this.filmService.deleteActeur(this.film().id, acteur.id).subscribe({
      next: (fait) => {
        console.log("acteur retirée");
        const nuewList = list.filter(a => a.id !== acteur.id);
        const nuewFilm: Film = {...this.film(), acteurs: nuewList};
        this.nuewFilm.emit(nuewFilm);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  protected readonly output = output;
}
