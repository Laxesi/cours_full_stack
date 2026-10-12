import {Component, inject} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe} from '@angular/common';
import {FilmCard} from '../_reutilisables/film-card/film-card';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {FilmFormulaire} from '../_reutilisables/film-formulaire/film-formulaire';
import {Film} from '../../models/film';
import {Acteur} from '../../models/acteur';
import {merge, Subject} from 'rxjs';

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

  private filmsModifie$ = new Subject<Film[]>();

  filmsInitial$ = inject(FilmService).getAll()

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
