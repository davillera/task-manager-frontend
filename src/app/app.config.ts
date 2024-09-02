import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {importProvidersFrom} from "@angular/core";

import { routes } from './app.routes';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "../core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
    )
  ],

};
