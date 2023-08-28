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
  presentAlert(msg: any, title?: any, buttons?: any, cssClass?: any) {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertCtrl.create({
        header: title ? title : 'Alert',
        message: msg,
        backdropDismiss: false,
        buttons: buttons
          ? buttons
          : [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  resolve('');
                },
              },
            ],
      });
      this.alert.present();
      return alert;
    });
  }

  dismissAlert() {
    if (this.alert) {
      this.alert.dismiss();
    }
  }
}
