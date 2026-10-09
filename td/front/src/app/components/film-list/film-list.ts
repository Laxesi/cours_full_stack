import {Component, inject} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe} from '@angular/common';
import {FilmCard} from '../_reutilisables/film-card/film-card';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';

@Component({
  imports: [
    AsyncPipe,
    FilmCard,
    FilmMakeList
  ],
  selector: 'app-film-list',
  styleUrl: './film-list.css',
  templateUrl: './film-list.html',
})
export class FilmList {
  films$ = inject(FilmService).getAll()
}
