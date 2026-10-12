import {Component, inject} from '@angular/core';
import {ActeurService} from '../../services/acteur-service';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {AsyncPipe} from '@angular/common';
import {merge, Subject} from 'rxjs';
import {Acteur} from '../../models/acteur';
import {ActeurFormulaire} from '../_reutilisables/acteur-formulaire/acteur-formulaire';

@Component({
  imports: [
    FilmMakeList,
    ActeurMakeList,
    AsyncPipe,
    ActeurFormulaire
  ],
  selector: 'app-acteur-list',
  styleUrl: './acteur-list.css',
  templateUrl: './acteur-list.html',
})
export class ActeurList {
  ajouter = false;

  private acteurModifie$ = new Subject<Acteur[]>()

  acteursInitial$ = inject(ActeurService).getAll()

  acteurs$ = merge(this.acteursInitial$, this.acteurModifie$);

  private newList : Acteur[] | undefined;

  acteursUpdated(nuewacteur: Acteur, acteurs: Acteur[]) {
    if (nuewacteur){
      this.newList = [...acteurs, nuewacteur];
      this.acteurModifie$.next(this.newList);
    }
    this.ajouter = false
}
}
