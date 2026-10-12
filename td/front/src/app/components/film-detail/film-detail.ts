import {Component, computed, inject, input} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, merge, Subject, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {FilmFormulaire} from '../_reutilisables/film-formulaire/film-formulaire';
import {Film} from '../../models/film';
import {Router} from '@angular/router';
import {SuppressionConfirmation} from '../_reutilisables/suppression-confirmation/suppression-confirmation';
import {Acteur} from '../../models/acteur';
import {FilmActeurEdit} from '../_reutilisables/film-acteur-edit/film-acteur-edit';

@Component({
  imports: [
    AsyncPipe,
    ActeurMakeList,
    FilmFormulaire,
    SuppressionConfirmation,
    FilmActeurEdit
  ],
  selector: 'app-film-detail',
  styleUrl: './film-detail.css',
  templateUrl: './film-detail.html',
})
export class FilmDetail {
  id = input.required<string>();
  filmid = computed(() => Number(this.id()));

  modifier = false;
  supprimer = false;
  acteursEdit = false;

  private filmService = inject(FilmService);
  private router = inject(Router);

  private filmModifie$ = new Subject<Film>();

  filmInitial$ = toObservable(this.filmid).pipe(
    switchMap(id => this.filmService.getId(id))
  );

  film$ = merge(this.filmInitial$, this.filmModifie$)

  filmUpdated(nuewfilm: Film){
    if(nuewfilm){
      this.filmModifie$.next(nuewfilm);
    }
  }

  suppression(doit : boolean){
    if (doit){
      this.filmService.delete(this.filmid()).subscribe({
        next: (filmMod) => {
          console.log("film supprimer");
          this.router.navigate(["/films"]);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
    this.supprimer = false;
  }
}
