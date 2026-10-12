import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Toasts} from './components/_reutilisables/toasts/toasts';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Toasts],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('films-app');
}
