import {Component, input} from '@angular/core';
import {Observable} from 'rxjs';
import {Acteur} from '../../../models/acteur';
import {AsyncPipe} from '@angular/common';
import {ActeurCard} from '../acteur-card/acteur-card';

@Component({
  imports: [
    AsyncPipe,
    ActeurCard
  ],
  selector: 'app-acteur-make-list',
  styleUrl: './acteur-make-list.css',
  templateUrl: './acteur-make-list.html',
})
export class ActeurMakeList {
  acteurs = input.required<Acteur[]>();
}
