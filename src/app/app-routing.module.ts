import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductComponent } from './components/product/product.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
