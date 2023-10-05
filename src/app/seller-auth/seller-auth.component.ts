import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';

/**
 * Component responsible for handling seller authentication.
 */
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}

  /**
   * Flag to indicate whether to show the login form or not.
   */
  showLogin = false;

  /**
   * Error message to display in case of authentication failure.
   */
  authError = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  /**
   * Method to sign up a new user.
   * @param data - The sign up data.
   */
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  /**
   * Method to log in a user.
   * @param data - The login data.
   */
  login(data: Login): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is incorrect';
        alert('Login Failed');
      }
    });
  }

  /**
   * Method to open the login form.
   */
  openLogin(): void {
    this.showLogin = true;
  }

  /**
   * Method to open the sign up form.
   */
  openSignUp(): void {
    this.showLogin = false;
  }
}
