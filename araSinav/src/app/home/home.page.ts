import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Authentication } from '../authentication';

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

  constructor(private toastController: ToastController, private alertController: AlertController, private authentication: Authentication) { }

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

  getUserId() {
    const currentId = this.authentication.users()
    return currentId
  }

  addToCart(product: any) {
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: product.id,
            quantity: 1,
          }
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
        this.presentToast(`"${product.title}" sepete eklendi.`)
      })
      .catch(err => {
        this.presentToast('Sepete eklerken hata.')
        console.error('Fetch hatası:', err)
      })

  }

  async getCart() {
    try {
      const response = await fetch('https://dummyjson.com/carts/1')
      if (!response.ok) {
        throw new Error(`HTTP hatası: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.products) {
        this.cart = data.products
      } else {
        this.cart = []
      }
    } catch (error) {
      console.error('Sepet alınırken hata:', error)
      this.presentToast('Sepet bilgisi alınamadı.')
      this.cart = []
    }
  }

  async presentCartAlert() {
    await this.getCart()

    if (!this.cart || this.cart.length === 0) {
      const alert = await this.alertController.create({
        header: 'Sepetim',
        message: 'Sepetinizde henüz ürün bulunmuyor',
        buttons: ['Kapat']
      })
      await alert.present()
      return
    }


    const productMesaj = this.cart.map(p =>
      `${p.title} (x${p.quantity}) - ${p.price * p.quantity}`
    ).join('<br>');

    const totalProductMiktar = this.cart.reduce((sum, p) => sum + p.quantity, 0)
    const totalCartMiktar = this.cart.reduce((sum, p) => sum + (p.price * p.quantity), 0)

    const mesaj = `${productMesaj}<br><br>Toplam Ürün Sayısı: ${totalProductMiktar}<br>Toplam Tutar: ${totalCartMiktar}`

    const alert = await this.alertController.create({
      header: 'Sepetim',
      message: mesaj,
      buttons: ['Kapat']
    })
    await alert.present()
  }
}
