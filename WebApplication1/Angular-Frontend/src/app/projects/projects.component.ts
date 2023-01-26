import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainJson, ProjectsInterface } from 'src/types/Projects';
import { ConfigProjectsService } from '../config/config.projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects:ProjectsInterface = {
    length: 0,
    projects: []
  };
  errorMessage:string | undefined;
  
  constructor(private projectsService: ConfigProjectsService) {
    this.handleResponse = this.handleResponse.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
  }

  ngOnInit(): void {
    if(this.projectsService.sourceData===null){
     this.projectsService.getProjects().subscribe(this.handleResponse,this.handleErrorResponse);
    }
    else{
      this.projects = {
        length: this.projectsService.sourceData.projects.length,
        projects: this.projectsService.sourceData.projects
      }
    }
  }

  handleResponse(response:HttpResponse<Object>){
    var responseObj = {...response.body!} as MainJson;
    this.projects = {
      length: responseObj.projects.length,
      projects: responseObj.projects
    }
  }

  handleErrorResponse(errorReponse:HttpErrorResponse){
    this.errorMessage = errorReponse.message;
    return null;
  }
  

}
