import { Component, Input, OnInit } from '@angular/core';
import { ProjectDefinition } from 'src/types/Projects';
import { ConfigProjectsService } from '../config/config.projects.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
  language:string = "en";
  editText:string = "Edit";
  deleteText:string = "Delete";
  
  @Input() project!: ProjectDefinition;

  constructor(private projectsService: ConfigProjectsService) { }

  ngOnInit(): void {
    this.projectsService.languageSubject.subscribe({
      next: (x:any )=> this.language = x
    });
  }

  ngDoCheck(){
    this.language =  this.projectsService.language;
  }

}
