import {Component, input} from '@angular/core';
import {Film} from '../../../models/film';
import {AsyncPipe} from '@angular/common';
import {FilmCard} from '../film-card/film-card';
import {Observable} from 'rxjs';

@Component({
  imports: [
    AsyncPipe,
    FilmCard
  ],
  selector: 'app-film-make-list',
  styleUrl: './film-make-list.css',
  templateUrl: './film-make-list.html',
})
export class FilmMakeList {
  films = input.required<Film[]>();
}
