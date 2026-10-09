import {Component, inject} from '@angular/core';
import {ActeurService} from '../../services/acteur-service';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {AsyncPipe} from '@angular/common';

@Component({
  imports: [
    FilmMakeList,
    ActeurMakeList,
    AsyncPipe
  ],
  selector: 'app-acteur-list',
  styleUrl: './acteur-list.css',
  templateUrl: './acteur-list.html',
})
export class ActeurList {
  acteurs$ = inject(ActeurService).getAll()
}
