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
  productEndpoint = 'products';
  categoryEndpoint = 'category';

  getProductList(categoryId: number): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(
        `${this.baseUrl}/${this.productEndpoint}/search/findByCategoryId?id=${categoryId}`
      )
      .pipe(
        map((res) => res._embedded.products),
        catchError((err) => {
          console.log('Error happens in backend: ', err);
          return of([]);
        })
      );
  }

  getProductCategory(): Observable<any> {
    return of(2);
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
