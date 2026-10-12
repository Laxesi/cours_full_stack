import {Component, inject, input, output} from '@angular/core';
import {Film} from '../../../models/film';
import {FormsModule} from '@angular/forms';
import {FilmService} from '../../../services/film-service';
import {NotificationService} from '../../../services/notification-service';

@Component({
  imports: [FormsModule],
  selector: 'app-film-formulaire',
  styleUrl: './film-formulaire.css',
  templateUrl: './film-formulaire.html',
})
export class FilmFormulaire {
  filminput = input<Film | undefined>(undefined)
  nuewFilm = output<Film>();

  private filmservice = inject(FilmService);
  private notificationService = inject(NotificationService);

  film: Partial<Film> = {
    id: 0,
    titre : '',
    realisateur: '',
    dateSortie: '',
    genre: '',
    acteurs: []
  }

  ngOnInit() {
    if(this.filminput()){
      this.film = {...this.filminput()}
    }
  }

  enregistrer(){
    console.log(this.film)
    if(this.film.id == 0){
      this.filmservice.post(this.film as Film).subscribe({
        next: (filmCree) => {
          console.log("film crée");
          this.nuewFilm.emit(filmCree);
        },
        error: (err) => {
          const problem = err.error;
          this.notificationService.notifie(
            problem?.title || "Erreur de création",
            problem?.detail || "Impossible d'enregistrer le film."
          );
        }
      })
    }else {
      this.filmservice.put(this.film.id!, this.film as Film).subscribe({
        next: (filmMod) => {
          console.log("film modifier");
          if(this.film) {
            // @ts-ignore
            filmMod.acteurs = this.film.acteurs
          }
          this.nuewFilm.emit(filmMod);
        },
        error: (err) => {
          const problem = err.error;
          this.notificationService.notifie(
            problem?.title || "Erreur de modification",
            problem?.detail || "Impossible de modifiée le film."
          );
        }
      })
    }
  }
}
