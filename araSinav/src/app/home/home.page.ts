import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  cart: any[] = [];
  products: any[] = [];
  private apiUrl = 'https://dummyjson.com/products';

  paletteToggle = false;

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.fetchProducts();

    // Dark Mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }
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
      console.error('Ürünler çağırılamadı:', error);
    }
  }

  async presentToast() {
  }

  addToCart() {
  }

  async presentAddedToCartAlert() {
  }

  async getCart() {
  }

  async presentCartAlert() {
  }

}
