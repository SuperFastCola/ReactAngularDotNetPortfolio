import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigProjectsService } from './config/config.projects.service';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InputFieldComponent } from './input-field/input-field.component';
import { ImageFieldComponent } from './image-field/image-field.component';
import { UrlFieldComponent } from './url-field/url-field.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectFormService } from './config/project.form.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectSummaryComponent,
    LanguageToggleComponent,
    PathNotFoundComponent,
    ProjectDetailsComponent,
    HomeButtonComponent,
    MainNavigationComponent,
    InputFieldComponent,
    ImageFieldComponent,
    UrlFieldComponent
    ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      { 
        defaultLanguage: 'fr',
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
        }
      }
    )
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-US' },ConfigProjectsService, ProjectFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
