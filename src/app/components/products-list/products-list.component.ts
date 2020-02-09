import { Component, OnInit } from '@angular/core';

import { Product } from "src/app/models/Product";
import { Router } from "@angular/router";

import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: any = [];

  constructor(private route: Router, private productService: ProductService) {
    if (localStorage.getItem('users') === null) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res
      },
      err => console.log(err)
    )
  }

}
