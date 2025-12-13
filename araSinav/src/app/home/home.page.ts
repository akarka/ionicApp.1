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
  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';
  alertButtons: string[] = ['OK'];

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

  addToCart(productsToAdd: { id: number; quantity: number }[]) {
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: productsToAdd
      })
    })
      .then(res => {
        if (!res.ok) {
          this.presentToast('HTTP hatası: ${res.status}')
        }
        return res.json()
      })
      .then(data => {
        console.log(data, ' sepete eklendi.');
        this.presentAddedToCartAlert();
      })
      .catch(error => console.error('Ürünü sepete eklerken sorun:', error))
  }

  async presentAddedToCartAlert() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Ürün sepete başarıyla eklendi',
      buttons: ['Tamam']
    });
    await alert.present();
  }


  async getCart() {
    try {
      const response = await fetch('https://dummyjson.com/carts/user/1');
      if (!response.ok) {
        this.presentToast(`HTTP hatası: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data.carts[0];
    } catch (error) {
      console.error('Sepet çağırılamadı:', error);
      this.presentToast('Sepet çağırılırken bir hata oluştu.');
      return null;
    }
  }

  async presentCartAlert() {
    const cartData = await this.getCart();
    if (!cartData || !cartData.products || cartData.products.length === 0) {
      this.presentToast('Sepet çağırılamıyor veya boş.');
      this.alertHeader = 'Your Cart';
      this.alertMessage = 'Your cart is empty.';
      this.isAlertOpen = true;
      return;
    }

    this.alertHeader = 'Your Cart';
    this.alertMessage = cartData.products.map((p: any) =>
      `${p.title} (x${p.quantity}) - $${p.price.toFixed(2)}`
    ).join('<br>') + `<br><br><b>Total: $${cartData.total.toFixed(2)}</b>`;

    this.isAlertOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
