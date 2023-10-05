import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, SignUp } from '../data-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

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

  userLogin(data: Login) {
    this.http
      .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        console.warn(res);
        if (res && res.body && res.body.length) {
          console.warn("user logged in");
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['/seller-home']);
        } else {
          console.warn("login failed");
          this.isLoginError.emit(true);
        }
      })
  }
}
