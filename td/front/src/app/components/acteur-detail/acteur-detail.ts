import {Component, computed, inject, input} from '@angular/core';
import {FilmService} from '../../services/film-service';
import {toObservable} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {ActeurService} from '../../services/acteur-service';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {AsyncPipe} from '@angular/common';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';

@Component({
  imports: [
    ActeurMakeList,
    AsyncPipe,
    FilmMakeList
  ],
  selector: 'app-acteur-detail',
  styleUrl: './acteur-detail.css',
  templateUrl: './acteur-detail.html',
})
export class ActeurDetail {
  id = input.required<string>();
  acteurid = computed(() => Number(this.id()));
  private acteurService = inject(ActeurService);

  acteur$ = toObservable(this.acteurid).pipe(
    switchMap(id => this.acteurService.getId(id))
  );
}
