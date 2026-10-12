import {Component, HostListener, inject, input} from '@angular/core';
import {Film} from '../../../models/film';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-film-card',
  styleUrl: './film-card.css',
  templateUrl: './film-card.html',
  host: {
    '[class.oldMovie]': "estAncien(film())"
  }
})
export class FilmCard {
  private router = inject(Router);

  film = input.required<Film>();

  @HostListener("click") onClick(){
    this.router.navigate(["/films", this.film().id])
  }

  estAncien(f: Film){
    return new Date(f.dateSortie).getFullYear() < 2000;
  }
}
