import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  products: any[] = [];
  private apiUrl = 'https://dummyjson.com/products';

  constructor() {}

  ngOnInit() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const limit = 6;
    try {
      const response = await fetch(`${this.apiUrl}?limit=${limit}`);
      const data = await response.json();
      this.products = data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

}
