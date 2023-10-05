import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, SignUp } from '../data-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  /**
   * A BehaviorSubject that emits a boolean value indicating whether the seller is logged in or not.
   */
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  /**
   * An EventEmitter that emits a boolean value indicating whether there was an error during login or not.
   */
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sends a POST request to the server to sign up a new seller.
   * @param data An object containing the seller's sign up data.
   */
  userSignUp(data: SignUp): void {
    this.http
      .post('http://localhost:3000/seller/', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['/seller-home']);
      });
  }

  /**
   * Checks if there is a seller stored in the local storage and logs them in if there is.
   */
  reloadSeller() {
    const seller = localStorage.getItem('seller');

    if (seller) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  /**
   * Sends a GET request to the server to log in a seller.
   * @param data An object containing the seller's login data.
   */
  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        console.warn(res);
        if (res && res.body && res.body.length) {
          console.warn('user logged in');
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['/seller-home']);
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
