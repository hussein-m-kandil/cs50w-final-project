import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { PrimeNGConfigType, providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DARK_SCHEME_CN, initColorScheme } from './color-scheme';
import { retryingInterceptor } from './retrying-interceptor';
import { authInterceptor } from './accounts';

export const interceptors = [authInterceptor, retryingInterceptor];

export const primengConfig: PrimeNGConfigType = {
  inputVariant: 'filled',
  ripple: true,
  theme: {
    preset: Material,
    options: {
      darkModeSelector: '.' + DARK_SCHEME_CN,
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng',
      },
    },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors(interceptors)),
    provideAppInitializer(initColorScheme),
    provideBrowserGlobalErrorListeners(),
    providePrimeNG(primengConfig),
  ],
};
