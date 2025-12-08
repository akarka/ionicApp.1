import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.products;
    });
  }

}
