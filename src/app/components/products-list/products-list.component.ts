import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { ProductService } from "src/app/services/product/product.service";
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  products: any = [];
  search: string = '';

  constructor(private route: Router, private productService: ProductService) {
    if (localStorage.getItem('users') === null) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res
      },
      err => console.log(err)
    )
  }

  findProducts(): void {
    if (this.search != '') {
      this.productService.searchProducts(this.search).subscribe(
        res => {
          this.products = res
        },
        err => console.log(err)
      )
    }
  }

  addToCart(product: Product): void {
    let actualCart: any = [];
    let count: number = 0;
    if (localStorage.getItem('cart') != null) {
      actualCart = JSON.parse(localStorage.getItem('cart'))
    }
    if (localStorage.getItem('countProducts') != null) {
      count = Number(localStorage.getItem('countProducts'))
    }
    if (product.qty > 0 && product.qty != null && product.stock >= product.qty) {
      let lastCart: any = [];
      let counting: number = 0;
      actualCart.forEach(el => {
        if (el.id == product.id) {
          el.qty += product.qty
          counting += 1
        }
        lastCart.push(el)
      });
      if (counting > 0) {
        this.updateStock(product,actualCart, lastCart)
      } else {
        actualCart.push(product)
        localStorage.setItem('countProducts', String(count + 1))
        this.updateStock(product,actualCart)
      }
    }
  }

  updateStock(product: Product, actualCart: any, lastCart?: any): void {
    if (lastCart != null && lastCart != undefined) {
      localStorage.setItem('cart', JSON.stringify(lastCart))
    } else {
      localStorage.setItem('cart', JSON.stringify(actualCart))
    }
    product.stock -= product.qty;
    delete product.created_at;
    delete product.qty;
    this.productService.updateProduct(product.id, product).subscribe(
      res => {
        this.route.navigate(['/']);
      },
      err => { console.log(err); }
    )
  }

}
