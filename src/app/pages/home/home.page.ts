import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  storyList: any;
  welcomeMsg: string = 'ओर्गास्म महिलाओं को अधिक रचनात्मक बना सकता है';
  welcomeMsgArr = [
    "ओर्गास्म महिलाओं को अधिक रचनात्मक बना सकता है",
    "फ़ोन पर सेक्स केवल मनुष्य नामक जानवर ही कर सकता है",
    "सेक्स प्राकृतिक चीज़ों में सबसे खूबसूरत चीज है ,जिसे पैसे से खरीदा जा सकता है",
    "सेक्स जीवन का आधार ही नहीं है ,बल्कि ये जीवन का कारण भी है",
    "सेक्स बिल्कुल पैसे की तरह होता है ,जितना मिले उतना ही कम",
    "90 साल की उम्र में सेक्स करने का मतलब एक रस्सी के साथ पुल पार करना",
    "सेक्स बहुत ही मजेदार होता है ,इसका मजा बिना हँसे ही लिया जाता है",
    "सेक्स बिल्कुल एक सॉफ्टवेयर की तरह होता है ,ये जब अच्छा होता है ,जब ये फ्री होता है",
    "प्यार बिल्कुल आइस -क्रीम की तरह होता है ,लेकिन सेक्स उसके ऊपर रखी चेरी के समान होता है ।",
    "महिलाओं को सेक्स के लिए एक कारण की ज़रुरत होती है लेकिन मर्दों को बस एक जगह की",
    "सेक्स वास्तव में इन्सान के लिए सबसे करीबी स्पर्शों में से एक स्पर्श होता है। लेकिन इन्सान इसी स्पर्श से डरता हैं।"
  ]

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public apiService: ApiService,
    public commonService: CommonService,
    ) {}


  i = 0;
  ngOnInit(): void {
    this.getStory()

    const resetWelcomeMsg = () => {
      if(this.i > this.welcomeMsgArr.length) this.i = 0;
      this.i++;
      this.welcomeMsg = this.welcomeMsgArr[this.i]
    }

    setInterval(function(){
      resetWelcomeMsg();
    }, 30000)
  }

  ngonDestroy() {
    if (this.isShowBanner) AdMob.removeBanner();
  }

  isShowBanner: boolean = false;
  async ionViewDidEnter() {
    await this.initialize();
    this.banner();
  }

  async banner() {
    try {
     const options: BannerAdOptions = {
       adId: 'ca-app-pub-8831010664329201/3407444070',
       adSize: BannerAdSize.FULL_BANNER,
       position: BannerAdPosition.BOTTOM_CENTER,
       margin: 0,
       isTesting: true
     };
     AdMob.showBanner(options).then(
       (res) => {
         this.isShowBanner = true;
       },
       (err) => {
       }
     );
    } catch (err) {
    }
  }

  async initialize() {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    }).then(
      (res) => {
        console.log('res: initialize:: story page', res);
      },
      (err) => {
        console.log('err: initialize:: story page', err);
      }
    );
  }

  openStory(storyObj: any){
    if (this.isShowBanner) AdMob.removeBanner();
    this.router.navigate(['/story'],{
      queryParams: storyObj,
    });
  }

  getStory(){
    this.commonService.presentLoader()
    this.apiService.get('https://gandikahaniya-8a598-default-rtdb.firebaseio.com/kahaniya.json').subscribe(res => {
      this.storyList = this.convertObjToArr(res)
      this.commonService.dismissLoader();
    }, err => {
      this.commonService.dismissLoader();
    })
  }

  convertObjToArr(obj: any) {
    let returnArr: any = [];
    Object.keys(obj).forEach((objKey) => {
      let value = obj[objKey];
      if (typeof value == 'object') {
        value['key'] = objKey;
        returnArr.push(value);
      }
    });
    return returnArr;
  }
}
