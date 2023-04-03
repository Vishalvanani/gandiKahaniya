import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }
  
  async presentLoader() {
    this.loadingCtrl
      .create({
        duration: 8000,
        backdropDismiss: true,
        mode: 'md',
      })
      .then((res) => {
        res.present();
      });
  }

  public dismissLoader() {
    this.loadingCtrl
      .dismiss()
      .then((response) => {})
      .catch((err) => {
        console.log('Error occurred : ', err);
      });
  }

  // --- present toast
  async presentToast(msg?: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  alert: any;
}
