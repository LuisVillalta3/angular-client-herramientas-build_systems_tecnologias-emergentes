import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from 'src/app/models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URI = 'http://127.0.0.1:3000/api/products';
  SEARCH_URI = 'http://127.0.0.1:3000/api/search';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product> {
    return this.http.get(`${this.API_URI}`);
  }

  searchProducts(name: string): Observable<Product> {
    return this.http.get(`${this.SEARCH_URI}/${name}`);
  }

  getProduct(id: string|number): Observable<Product> {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveProduct(Product: Product): Observable<Product> {
    return this.http.post(`${this.API_URI}`, Product);
  }

  deleteProduct(id: string|number): Observable<Product> {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  updateProduct(id: string|number, Product: Product): Observable<Product> {
    return this.http.put(`${this.API_URI}/${id}`, Product);
  }

}
