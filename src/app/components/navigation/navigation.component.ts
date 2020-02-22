import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  countProduct: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem('countProducts') != null) {
      this.countProduct = Number(localStorage.getItem('countProducts'))
    }
  }

  constructor(private route: Router) { }

  logout() {
    localStorage.removeItem('users');
    this.route.navigate(['/login']);
  }

}
