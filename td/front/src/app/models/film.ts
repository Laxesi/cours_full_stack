import {Acteur} from './acteur';

export interface Film {
  id: number;
  titre: string;
  realisateur: string;
  dateSortie: string;
  genre: string;
  acteurs: Acteur[];
}
