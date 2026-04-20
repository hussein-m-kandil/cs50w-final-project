import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { retryingInterceptor } from './retrying-interceptor';

import { PrimeNGConfigType, providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';

export const interceptors = [retryingInterceptor];

export const primengConfig: PrimeNGConfigType = {
  inputVariant: 'filled',
  ripple: true,
  theme: {
    preset: Material,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng',
      },
    },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors(interceptors)),
    provideBrowserGlobalErrorListeners(),
    providePrimeNG(primengConfig),
    provideRouter(routes),
  ],
};
