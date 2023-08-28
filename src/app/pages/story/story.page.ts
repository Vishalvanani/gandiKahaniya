import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdMob, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any;
  title: any;

  constructor(
    public navParams: NavParams,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      console.log('params: ', params);
    });
  }

  async ngOnInit() {
    await this.initialize();
    await this.showInterstitial();

    this.route.queryParams.subscribe((res: any) => {
      console.log(res);
      this.title = res.title;
      this.story = res.story;
    });
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
      adId: 'ca-app-pub-8831010664329201/5056988543',
      isTesting: true,
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  async ngonDestroy() {
    this.isClickedOnBack = false;
  }

  isClickedOnBack: boolean = false;


  async banner() {
    try {
     const options: BannerAdOptions = {
       adId: 'ca-app-pub-8831010664329201/8879811347',
       adSize: BannerAdSize.FULL_BANNER,
       position: BannerAdPosition.BOTTOM_CENTER,
       margin: 0,
       isTesting: true
     };
     AdMob.showBanner(options).then(
       (res) => {
        //  this.isShowBanner = true;
       },
       (err) => {
       }
     );
    } catch (err) {
    }
  }
}
