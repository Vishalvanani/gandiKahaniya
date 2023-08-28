import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, Platform } from '@ionic/angular';
import { AdMob, AdOptions } from '@capacitor-community/admob';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private _location: Location,
    private platform: Platform,
    private alertController: AlertController,
    private commonService: CommonService,
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(10, async (res) => {
      console.log('window.location.pathname: ', window.location.pathname);
      if (
        this._location.isCurrentPathEqualTo('/home') ||
        this._location.isCurrentPathEqualTo('')
      ) {
        // Show Exit Alert!
        this.showExitConfirm();
      } else {
        if (window.location.pathname == '/story') {
          await AdMob.showInterstitial();
        }
      }
    });
  }

  goToBack() {
    // Navigate to back page
    this._location.back();
  }

  initializeApp() {}

  async ngOnInit() {
    await this.initialize();
    await this.showInterstitial();
    this.restartIdleLogoutTimer();
  }

  async initialize() {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    }).then(
      (res) => {
        console.log('res: initialize', res);
      },
      (err) => {
        console.log('err: initialize', err);
      }
    );
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: 'ca-app-pub-8831010664329201/3743906870',
      isTesting: true,
    };
    await AdMob.prepareInterstitial(options);
  }

  closeAppAlert: any;
  async showExitConfirm() {
    if (!this.closeAppAlert) {
      this.closeAppAlert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              this.closeAppAlert = null;
            },
          },
          {
            text: 'Exit',
            handler: () => {
              (navigator as any).app.exitApp();
            },
          },
        ],
      });
      this.closeAppAlert.present();
    }
  }

  @HostListener('touchstart')
  onTouchStart() {
    console.log("98");
    this.restartIdleLogoutTimer();
  }

  idleLogoutTimer: any;
  
  restartIdleLogoutTimer() {
    console.log("104");
    clearTimeout(this.idleLogoutTimer);
    this.idleLogoutTimer = setTimeout(() => {
      this.logoutUser();
    }, 60000);
  }

  async logoutUser() {
    // your logout logic here
    console.log("115");
    let idealTimeoutAlert = await this.alertController.create({
      header: 'Alert',
      message: 'You are in ideal timeout.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Stay',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Logout',
          handler: () => {
            // Handle Logout Code
          },
        },
      ],
    });
    idealTimeoutAlert.present();
  }
}
