import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterModule],
  selector: 'bytebank-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bytebank';

  constructor() {
    // initFlowbite();
  }
}
