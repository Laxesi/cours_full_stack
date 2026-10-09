import {inject, Service} from '@angular/core';
import {Film} from '../models/film';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Acteur} from '../models/acteur';

@Service()
export class FilmService {
  private http = inject(HttpClient);
  private url = '/api/films';

  getAll(): Observable<Film[]>{
    return this.http.get<Film[]>(this.url);
  }

  getId(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.url}/${id}`);
  }

  getActeur(id: number): Observable<Acteur[]> {
    return this.http.get<Acteur[]>(`${this.url}/${id}/acteurs`);
  }

  post(film: Partial<Film>): Observable<Film> {
    return this.http.post<Film>(this.url, film);
  }

  put(id: number, film: Film): Observable<Film>{
    return this.http.put<Film>(`${this.url}/${id}`, film);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  postActeur(idFilm: number, idActeur: number, acteur: Partial<Acteur>): Observable<Film>{
    return this.http.post<Film>(`${this.url}/${idFilm}/acteurs/${idActeur}`, acteur)
  }

  deleteActeur(idFilm: number, idActeur: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${idFilm}/acteurs/${idActeur}`)
  }
}
