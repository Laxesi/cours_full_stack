import { Service, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Acteur} from '../models/acteur';
import {Film} from '../models/film';
import {Observable} from 'rxjs';

@Service()
export class ActeurService {
  private http = inject(HttpClient);
  private url = '/api/acteurs';

  getAll(): Observable<Acteur[]>{
    return this.http.get<Acteur[]>(this.url);
  }

  getId(id: number): Observable<Acteur> {
    return this.http.get<Acteur>(`${this.url}/${id}`);
  }

  post(acteur: Partial<Acteur>): Observable<Acteur> {
    return this.http.post<Acteur>(this.url, acteur);
  }

  put(id: number, acteur: Acteur): Observable<Acteur>{
    return  this.http.put<Acteur>(`${this.url}/${id}`, acteur);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  getFilm(id: number): Observable<Film[]>{
    return this.http.get<Film[]>(`${this.url}/${id}/films`)
  }
}
