import { Component, OnInit } from '@angular/core';
import { ConfigProjectsService } from '../config/config.projects.service';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss']
})
export class HomeButtonComponent implements OnInit {

  constructor(private projectsService: ConfigProjectsService) { 
  }

  ngOnInit(): void {
  }


}
