import { TestBed } from '@angular/core/testing';

import { SellerService } from './seller.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('SellerService', () => {
  let service: SellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(SellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
