import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private _productService: ProductService) {}

  products: Product[] = [];
  ngOnInit() {
    this.listProducts();
  }
  listProducts() {
    this._productService.getProductList().subscribe((data) => {
      if (data.length) {
        this.products = data;
      } else {
        console.log('Error!');
      }
    });
  }
}
