import {HttpHandlerFn, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import {catchError, finalize, throwError} from "rxjs";
import {Router} from "@angular/router"; // Asegúrate de importar Router para la redirección
import {inject} from '@angular/core';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const loginUrl = '/auth/login';
  const router = inject(Router); // Inyecta el Router

  if (req.url.includes(loginUrl)) {
    return next(req).pipe(finalize(() => {}));
  }

  const token = sessionStorage.getItem('token');
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']);
      }
      return throwError(() => error);
    }),
  );
}
