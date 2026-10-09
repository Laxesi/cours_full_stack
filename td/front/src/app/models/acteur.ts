import {Film} from './film';

export interface Acteur {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  films: Film[];
}
