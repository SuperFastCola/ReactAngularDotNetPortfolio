import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectDefinition, ProjectsInterface } from 'src/types/Projects';
import { ConfigProjectsService } from '../config/config.projects.service';
import { ProjectFormService } from '../config/project.form.service';
import { InputFieldBaseComponent } from '../input-field-base/input-field-base.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  id:UrlSegment | null = null;
  projects:ProjectsInterface = {
    length: 0,
    projects: []
  };
  errorMessage:string | undefined;
  project:ProjectDefinition | undefined = undefined;
  languageSubscriber:any = null;
  projectSubscriber:any = null;
  language:string = "en";
  inputKeys:string[] = ['NAME','DESCRIPTION','ROLE'];

  constructor( private route: ActivatedRoute, private projectsService: ConfigProjectsService, private pfs: ProjectFormService) { 
    this.reloadJsonData = this.reloadJsonData.bind(this);
    this.updateProjectInComponent = this.updateProjectInComponent.bind(this);
    this.updateProjectOnServer = this.updateProjectOnServer.bind(this);
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.id = url.filter((u:UrlSegment)=> u.path.match(/[0-9]{1,}/))[0];

      if(this.projectsService.sourceData!==null){
        this.projectsService.getProjectByID(Number(this.id.path));
      }
      else{
        this.projectsService.getProjects().subscribe(this.reloadJsonData,this.handleErrorResponse)
      }
      
    });

    this.languageSubscriber = this.projectsService.languageSubject.subscribe({
      next: (x:any )=> this.language = x
    });

    this.projectSubscriber = this.projectsService.projectSubject.subscribe({
      next: (x:any )=> this.project = x
    });

  }

  updateProjectInComponent(projectProperty:ProjectDefinition){
    this.project =  {...projectProperty};
  }

  updateProjectOnServer(){
    this.projectsService.updateProject(Number(this.project!.id),this.project!).subscribe({
      next: (x:any)=>console.log(x),
      error: (x:any)=>console.log(x)
    })
  }

  reloadJsonData(response:HttpResponse<Object>){
   this.projectsService.getProjectByID(Number(this.id?.path));
  }

  handleErrorResponse(errorReponse:HttpErrorResponse){
    this.errorMessage = errorReponse.message;
    return null;
  }


  ngOnDestroy(){
    this.projectSubscriber.unsubscribe();
    this.languageSubscriber.unsubscribe();
  }

}
