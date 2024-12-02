import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../_services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
