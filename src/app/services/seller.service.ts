import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp } from '../data-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp): void {
    this.http
      .post('http://localhost:3000/seller/', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['/seller-home']);
      });
  }

  reloadSeller() {
    const seller = localStorage.getItem('seller');

    if (seller) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
}
