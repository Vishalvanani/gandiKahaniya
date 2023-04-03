import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public apiService: ApiService,
    public commonService: CommonService,
    ) {}


  ngOnInit(): void {
    this.getStory()
  }

  openStory(storyObj: any){
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
