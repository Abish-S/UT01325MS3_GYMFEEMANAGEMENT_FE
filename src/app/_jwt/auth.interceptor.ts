import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();
  if (token) {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    );
  }
  return next(req);
};
