import {Component, computed, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {merge, Subject, switchMap} from 'rxjs';
import {ActeurService} from '../../services/acteur-service';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {Acteur} from '../../models/acteur';
import {SuppressionConfirmation} from '../_reutilisables/suppression-confirmation/suppression-confirmation';
import {ActeurFormulaire} from '../_reutilisables/acteur-formulaire/acteur-formulaire';
import {FilmMakeList} from '../_reutilisables/film-make-list/film-make-list';
import {Film} from '../../models/film';

@Component({
  imports: [
    AsyncPipe,
    SuppressionConfirmation,
    ActeurFormulaire,
    FilmMakeList
  ],
  selector: 'app-acteur-detail',
  styleUrl: './acteur-detail.css',
  templateUrl: './acteur-detail.html',
})
export class ActeurDetail {
  id = input.required<string>();
  acteurid = computed(() => Number(this.id()));

  modifier = false;
  supprimer = false;

  private acteurService = inject(ActeurService);
  private router = inject(Router);

  private acteurModifie$ = new Subject<Acteur>();

  acteurInitial$ = toObservable(this.acteurid).pipe(
    switchMap(id => this.acteurService.getId(id))
  );

  acteur$ = merge(this.acteurInitial$, this.acteurModifie$);

  acteurUpdate(nuewActeur : Acteur){
    if(nuewActeur){
      this.acteurModifie$.next(nuewActeur)
    }
  }

  suppression(doit : boolean) {
    if (doit){
      this.acteurService.delete(this.acteurid()).subscribe({
        next: (filmMod) => {
          console.log("acteur supprimer");
          this.router.navigate(["/acteurs"]);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
    this.supprimer = false;
  }
}
