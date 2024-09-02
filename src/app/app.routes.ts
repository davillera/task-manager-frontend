import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
  }
];
