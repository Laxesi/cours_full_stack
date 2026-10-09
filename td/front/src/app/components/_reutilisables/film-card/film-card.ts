import {Component, HostListener, inject, input} from '@angular/core';
import {Film} from '../../../models/film';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-film-card',
  styleUrl: './film-card.css',
  templateUrl: './film-card.html',
})
export class FilmCard {
  private router = inject(Router);

  film = input.required<Film>();

  @HostListener("click") onClick(){
    this.router.navigate(["/films", this.film().id])
  }
}
