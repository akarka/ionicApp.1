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

  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      position: 'top',
      duration: 2000
    });
    toast.present();


  }

  addToCart() {
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: 144,
            quantity: 4,
          },
          {
            id: 98,
            quantity: 1,
          },
        ]
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP hatası: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.presentToast('Ürün sepete eklendi.')
      })
      .catch(err => {
        this.presentToast('Sepete eklerken hata.')
        console.error('Fetch hatası:', err)
      })

  }

  async getCart() {
  }

  async presentCartAlert() {
  }

}
