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

  paletteToggle = false;

  constructor() { }

  ngOnInit() {
    this.fetchProducts();

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }
  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }


  async fetchProducts() {
    const limit = 10;
    const skip = 0;
    try {
      const response = await fetch(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      this.products = data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


}
