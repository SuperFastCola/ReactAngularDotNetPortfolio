import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
  showHome:boolean = false;
  constructor( private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if(url.length>0){
        this.showHome = true;
      }
    });
  }
}
