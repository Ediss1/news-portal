import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser'; // Use bootstrapApplication for Standalone Components
import { AppComponent } from './app/app.component'; // Import your root component
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { routes } from './app/app.routes'; // Ensure the correct path
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Configure routing
      HttpClientModule // Include HttpClientModule for HTTP requests
    ),
  ],
}).catch((err) => console.error(err));
