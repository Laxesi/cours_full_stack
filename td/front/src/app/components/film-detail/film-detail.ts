import {Component, computed, inject, input} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {AsyncPipe} from '@angular/common';
import {switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';

@Component({
  imports: [
    AsyncPipe,
    ActeurMakeList
  ],
  selector: 'app-film-detail',
  styleUrl: './film-detail.css',
  templateUrl: './film-detail.html',
})
export class FilmDetail {
  id = input.required<string>();
  filmid = computed(() => Number(this.id()));
  private filmService = inject(FilmService);

  film$ = toObservable(this.filmid).pipe(
    switchMap(id => this.filmService.getId(id))
  );
}
