import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { BehaviorSubject, from, Observable, Observer, Subject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MainJson, ProjectDefinition, ProjectsInterface } from 'src/types/Projects';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class ConfigProjectsService {
    public language:string = "en";
    public languageSubject = new BehaviorSubject("en");
    public projectSubject:any = new BehaviorSubject(null);
    public sourceData:MainJson | null = null;
    private baseURL:string = "https://localhost:44311//api/values";

    constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient, private translate:TranslateService) {
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.updateProject = this.updateProject.bind(this);

        translate.setDefaultLang('en');
        
        if(locale.match(/^fr/)){
            this.language = "fr";
            this.translate.use('fr');
        }
        else{
            this.language = "en";
            this.translate.use('en');
        }
    }

    handleError(e:any){
        console.log(e);
        return;
    }

    toggleLanguage(){
        switch(this.language){
            case "en":
                this.language = "fr";
                this.translate.use('fr');
                break;

            case "fr":
                this.language = "en";
                this.translate.use('en');
                break;
        }
        this.languageSubject.next(this.language);
    }

    getProjects() {
        return this.http.get<MainJson>(this.baseURL,{ observe: 'response' }).pipe(
            tap({
              next: (request) => {
                this.sourceData = request.body
                return request;
              },
              error: (error:any) => console.log(error)
            })
        )
    }

    getProjectByID(id:number) {
        this.projectSubject.next(this.sourceData?.projects.filter((p:ProjectDefinition)=> Number(p.id)===id)[0]);
    }

    updateProject(projectId:number,projectToUpdate:ProjectDefinition){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'           
            })
          };
          
        return this.http.put<ProjectDefinition>(`${this.baseURL}/${projectId}`,projectToUpdate,httpOptions);
    }
}

