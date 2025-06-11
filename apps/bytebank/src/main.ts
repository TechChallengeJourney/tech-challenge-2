import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerElements } from '@bytebank/design-system';

registerElements();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
