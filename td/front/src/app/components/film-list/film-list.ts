import {Component, inject} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe} from '@angular/common';
import {FilmCard} from '../_reutilisables/film-card/film-card';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {FilmFormulaire} from '../_reutilisables/film-formulaire/film-formulaire';
import {Film} from '../../models/film';
import {Acteur} from '../../models/acteur';
import {catchError, merge, of, Subject} from 'rxjs';
import {NotificationService} from '../../services/notification-service';

@Component({
  imports: [
    AsyncPipe,
    FilmCard,
    FilmMakeList,
    FilmFormulaire
  ],
  selector: 'app-film-list',
  styleUrl: './film-list.css',
  templateUrl: './film-list.html',
})
export class FilmList {
  ajouter = false;

  private notificationService = inject(NotificationService);

  private filmsModifie$ = new Subject<Film[]>();

  filmsInitial$ = inject(FilmService).getAll().pipe(
    catchError(err => {
      const problem = err.error;
      this.notificationService.notifie(
        problem?.title || "Erreur de chargement",
        problem?.detail || "Impossible de récupérer la liste des films."
      );
      return of([]);
    })
  )

  films$ = merge(this.filmsInitial$, this.filmsModifie$);

  private newList: Film[] | undefined;

  filmsUpdated(nuewfilm: Film, films: Film[]){
    if(nuewfilm){
      this.newList = [...films, nuewfilm];
      this.filmsModifie$.next(this.newList);
    }
    this.ajouter = false;
  }
}
