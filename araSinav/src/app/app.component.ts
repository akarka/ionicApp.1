import { Component } from '@angular/core';
import { Authentication } from './authentication';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private authentication: Authentication) {
    this.kontrol();
  }

  async kontrol() {
    const { value } = await Preferences.get({ key: 'ionicAuth_usertoken' });

    if (value != null) {
      console.log("Storage'da Token bulundu, Yönlendiriliyor.. ");
      this.authentication.router.navigateByUrl('/home');
    }
    else
      this.authentication.router.navigateByUrl('/login');


  }

}
