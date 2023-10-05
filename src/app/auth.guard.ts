import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

/**
 * A guard that checks if the user is authenticated as a seller.
 * @param route - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns A boolean indicating whether the user is authenticated as a seller.
 */
export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('seller')) {
    return true;
  }
  
  return inject(SellerService).isSellerLoggedIn;
};
