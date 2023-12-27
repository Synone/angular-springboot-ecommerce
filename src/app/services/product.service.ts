import { Observable, catchError, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  protected baseUrl = 'http://localhost:8080/api';

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl + '/products').pipe(
      map((res) => res._embedded.products),
      catchError((err) => {
        console.log('Error happens in backend: ', err);
        return of([]);
      })
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
