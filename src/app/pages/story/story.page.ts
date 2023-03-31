import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.route.params.subscribe(params => {
      console.log('params: ', params);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((res: any)=>{
      console.log(res);
      this.title = res.title
      this.story = res.story
  });
  }

}
