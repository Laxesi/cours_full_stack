import {Component, inject, input, output} from '@angular/core';
import {Acteur} from '../../../models/acteur';
import {FilmService} from '../../../services/film-service';
import {ActeurService} from '../../../services/acteur-service';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-acteur-formulaire',
  styleUrl: './acteur-formulaire.css',
  templateUrl: './acteur-formulaire.html',
})
export class ActeurFormulaire {
  acteurinput = input<Acteur | undefined>(undefined);
  nuewActeur = output<Acteur>();

  private acteurService = inject(ActeurService)

  acteur: Partial<Acteur> = {
    id: 0,
    nom: '',
    prenom: '',
    dateNaissance: '',
    films: []
  }

  ngOnInit() {
    if(this.acteurinput()){
      this.acteur = {...this.acteurinput()}
    }
  }

  enregistrer(){
    console.log(this.acteur)
    if(this.acteur.id == 0){
      this.acteurService.post(this.acteur as Acteur).subscribe({
        next: (acteurCree) => {
          console.log("acteur crée");
          this.nuewActeur.emit(acteurCree);
        },
        error: (err) => {
          console.error(err)
        }
      })
    }else {
      this.acteurService.put(this.acteur.id!, this.acteur as Acteur).subscribe({
        next: (acteurMod) => {
          console.log("acteur modifier")
          if(this.acteur){
            // @ts-ignore
            acteurMod.films = this.acteur.films;
          }
          this.nuewActeur.emit(acteurMod)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }
}
