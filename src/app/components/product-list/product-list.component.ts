import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) {}
  currentCategoryId: number;
  products: Product[] = [];
  ngOnInit() {
    this._route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    const hasCategoryId = this._route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = Number(
        this._route.snapshot.paramMap.get('id') || '1'
      );
    } else {
      this.currentCategoryId = 1;
    }
    this._productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        if (data.length) {
          this.products = data;
        } else {
          console.log('Error!');
        }
      });
  }
}
