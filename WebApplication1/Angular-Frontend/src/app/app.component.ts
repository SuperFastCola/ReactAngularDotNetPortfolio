import { Component } from '@angular/core';
import { ConfigProjectsService } from './config/config.projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dld-angular';
  today:Date = new Date();

  constructor(private projectsService: ConfigProjectsService){

  }
}
