import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {finalize} from "rxjs";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const loginUrl = '/auth/login';

  if (req.url.includes(loginUrl)) {
    return next(req).pipe(finalize(() => {}));
  }

  const token = sessionStorage.getItem('token');
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return next(clonedRequest)
    .pipe(finalize(() => {
    }));
}

