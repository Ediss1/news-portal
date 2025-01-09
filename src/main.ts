import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
