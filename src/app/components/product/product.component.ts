import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private route: Router, private productService: ProductService, private activedRoute: ActivatedRoute) {
    if (localStorage.getItem('users') === null) {
      this.route.navigate(['/login']);
    }
  }

  product: Product = {};

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.productService.getProduct(params.id).subscribe(
      res => {
        this.product = res
      },
      err => { console.log(err) }
    )
  }

}
