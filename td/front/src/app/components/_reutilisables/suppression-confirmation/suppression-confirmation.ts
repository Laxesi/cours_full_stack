import {Component, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-suppression-confirmation',
  styleUrl: './suppression-confirmation.css',
  templateUrl: './suppression-confirmation.html',
})
export class SuppressionConfirmation {
  confirm = output<boolean>()
}
