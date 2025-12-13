import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ToastController } from '@ionic/angular';


const backend = "https://dummyjson.com/";

@Injectable({
  providedIn: 'root',
})
export class Authentication {


  constructor(public router: Router, private toastController: ToastController, public alertController: AlertController, private http: HttpClient) { }

  login(veri: any) {
    return this.http.post(backend + 'auth/login', veri);
  }

  register(veri: any) {
    return this.http.post(backend + 'users/add', veri);
  }

  users() {
    return this.http.get(backend + 'users');
  }

  async setName(token: any) {
    await Preferences.set({
      key: 'ionicAuth_usertoken',
      value: JSON.stringify(token),
    });
  };

  async removeName() {
    await Preferences.remove({ key: 'ionicAuth_usertoken' });
  }

  async presentAlert(baslik: string, msj: string) {
    const alert = await this.alertController.create({
      header: baslik,
      message: msj,
      buttons: ['Tamam']
    });

    await alert.present();
  }

  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


}
