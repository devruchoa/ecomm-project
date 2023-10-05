import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}

  showLogin = false;
  authError = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: Login): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is incorrect';
        alert('Login Failed');
      }
    });
  }

  openLogin(): void {
    this.showLogin = true;
  }

  openSignUp(): void {
    this.showLogin = false;
  }
}
