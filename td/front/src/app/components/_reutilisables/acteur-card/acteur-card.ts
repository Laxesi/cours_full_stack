import {Component, HostListener, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import {Acteur} from '../../../models/acteur';

@Component({
  imports: [],
  selector: 'app-acteur-card',
  styleUrl: './acteur-card.css',
  templateUrl: './acteur-card.html',
})
export class ActeurCard {
  private router = inject(Router);

  acteur = input.required<Acteur>();

  @HostListener("click") onClick(){
    this.router.navigate(["/acteurs", this.acteur().id])
  }
}
