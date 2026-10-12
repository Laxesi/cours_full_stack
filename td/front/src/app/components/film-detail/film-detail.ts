import {Component, computed, inject, input} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {BehaviorSubject, catchError, merge, of, Subject, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {FilmFormulaire} from '../_reutilisables/film-formulaire/film-formulaire';
import {Film} from '../../models/film';
import {Router} from '@angular/router';
import {SuppressionConfirmation} from '../_reutilisables/suppression-confirmation/suppression-confirmation';
import {Acteur} from '../../models/acteur';
import {FilmActeurEdit} from '../_reutilisables/film-acteur-edit/film-acteur-edit';
import {NotificationService} from '../../services/notification-service';

@Component({
  imports: [
    AsyncPipe,
    ActeurMakeList,
    FilmFormulaire,
    SuppressionConfirmation,
    FilmActeurEdit,
    DatePipe
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
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  private filmModifie$ = new Subject<Film>();

  filmInitial$ = toObservable(this.filmid).pipe(
    switchMap(id => this.filmService.getId(id).pipe(
      catchError(err => {
        const problem = err.error;
        this.notificationService.notifie(
          problem?.title || "Erreur de chargement",
          problem?.detail || "Impossible de récupérée le détaille du film."
        );
        return of(null as unknown as Film);
      })
    ))
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
          const problem = err.error;
          this.notificationService.notifie(
            problem?.title || "Erreur de suppression",
            problem?.detail || "Impossible de supprimer le film."
          );
        }
      })
    }
    this.supprimer = false;
  }
}
