import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  carrito: any = []
  total: number = 0;

  constructor(private route: Router, private productService: ProductService) {
    if (localStorage.getItem('users') === null) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(): void {
    if (localStorage.getItem('cart') != null) {
      this.carrito = JSON.parse(localStorage.getItem('cart'))
      this.carrito.forEach(el => {
        this.total += el.qty * el.price
      });
    }
  }

  cleanAll(): void {
    localStorage.removeItem('cart')
    localStorage.removeItem('countProducts')
    this.route.navigate(['/products']);
  }

  buy(): void {
    this.carrito.forEach(el => {
      this.updateProduct(el)
    });
    this.cleanAll()
  }

  updateProduct(product: Product): void {
    product.stock -= product.qty;
    delete product.created_at;
    delete product.qty;
    this.productService.updateProduct(product.id, product).subscribe(
      res => { console.log('ok'); },
      err => { console.log(err); }
    )
  }

}
