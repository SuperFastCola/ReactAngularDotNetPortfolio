import { Component, OnInit } from '@angular/core';
import { ConfigProjectsService } from '../config/config.projects.service';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss']
})
export class LanguageToggleComponent implements OnInit {
  language:string | null = null;
  languageSubscriber:any = null;

  constructor(private projectsService: ConfigProjectsService) { 
    this.displayLanguage = this.displayLanguage.bind(this); 
  }

  ngOnInit(): void {
    //subscribe to the language subject 
    this.languageSubscriber = this.projectsService.languageSubject.subscribe({
      next: (x:any )=> this.displayLanguage(x)
    });

    //get the default language from ConfigProjectsService
    this.displayLanguage(this.projectsService.language);
  }

  ngDoCheck(){
    this.displayLanguage(this.projectsService.language);
  }

  displayLanguage(toLang:string){
    switch(toLang){
      case "en":
        this.language = "français"
        break
      case "fr":
        this.language = "english"
        break
    }
  }

  toggleLanguage(){
    this.projectsService.toggleLanguage();
  }

  ngOnDestroy(){
    this.languageSubscriber.unsubscribe();
  }

}
