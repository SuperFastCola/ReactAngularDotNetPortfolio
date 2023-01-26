import { Injectable } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Key } from 'protractor';
import { BaseLanguageType, ImageType, ProjectDefinition, UrlType } from 'src/types/Projects';
import { ConfigProjectsService } from './config.projects.service';
import { InputFieldBaseComponent } from '../input-field-base/input-field-base.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { Observable, of } from 'rxjs';


@Injectable()
export class ProjectFormService {

    formGroup:FormGroup | null = null;
    baseInputKeys:string[] = ["name","description","role"];
    public formData:InputFieldBaseComponent<string>[] = [];

    constructor(private cps:ConfigProjectsService, private fb:FormBuilder){
        this.buildFormGroup = this.buildFormGroup.bind(this);
        this.buildInput = this.buildInput.bind(this);
        this.buildImageGroup = this.buildImageGroup.bind(this);
        this.buildURLGroup = this.buildURLGroup.bind(this);


    }

    buildFormGroup(project:ProjectDefinition){
        var propsForm:any[] = [];

        this.baseInputKeys.map((i:any, index: number)=>{

                propsForm.push(
                    { [`${i}`] : this.fb.group(
                            { 
                                ["en"]: [project[i]["en"]], 
                                ["fr"]: [project[i]["fr"]], 
                            }
                        )
                    }
                );


                ["en","fr"].map((lang:string)=>{
                    this.formData.push(
                    new InputFieldBaseComponent(
                        {
                        value: project[i][lang],
                        key: i + `[${lang}]`,
                        label: i,
                        controlType: "text"
                        })
                    )
           });
        });
        
        console.log(new FormArray(propsForm));

        var fg:FormControl[] = [];

        this.formData.map((input:any)=>{
            fg[input.key] = new FormControl(input.value);
        });

        return new FormGroup(fg);
    }

    formInputs(){

        console.log(this.formData);
        return of(this.formData);
    }

    buildInput(input:BaseLanguageType):FormControl[]{

        return [];
    }

    buildImageGroup<FormGroup>(inputs:ImageType){

    }

    buildURLGroup<FormGroup>(input:UrlType){

    }
}