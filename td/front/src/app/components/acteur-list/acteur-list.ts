import {Component, inject} from '@angular/core';
import {ActeurService} from '../../services/acteur-service';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {ActeurMakeList} from '../_reutilisables/acteur-make-list/acteur-make-list';
import {AsyncPipe} from '@angular/common';
import {catchError, merge, of, Subject} from 'rxjs';
import {Acteur} from '../../models/acteur';
import {ActeurFormulaire} from '../_reutilisables/acteur-formulaire/acteur-formulaire';
import {NotificationService} from '../../services/notification-service';

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

  private notificationService = inject(NotificationService);

  private acteurModifie$ = new Subject<Acteur[]>()

  acteursInitial$ = inject(ActeurService).getAll().pipe(
    catchError(err => {
      const problem = err.error;
      this.notificationService.notifie(
        problem?.title || "Erreur de chargement",
        problem?.detail || "Impossible de récupérer la liste des acteurs."
      );
      return of([])
    })
  );

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
