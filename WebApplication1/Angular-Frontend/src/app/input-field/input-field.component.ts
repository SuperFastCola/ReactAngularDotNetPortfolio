import { LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProjectDefinition, InputUpdateObject } from 'src/types/Projects';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent {
  @Input() properties!: any | undefined;
  @Input() label!: string | undefined;
  @Input() languageSpecific: boolean = true;
  @Output() modifiedProject = new EventEmitter<ProjectDefinition>();

  //form styling
  inputStyles:string = "block w-full mt-1 rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0";
  //holds modified props
  intProps:any = {};
  //hold property name key
  propName:string = "";

  languageKeys:string[] = ["en","fr"];

  //form name attrubutes.
  inputName:any={
    en:null,
    fr:null
  }
  translatedLabel:string | null = null;

  constructor(private translate: TranslateService){
    this.updateProps = this.updateProps.bind(this);
  }

  ngOnInit(): void {

    this.propName = String(this.label??null).toLowerCase();

    if(this.propName!==null){
      this.intProps = {...this.properties};
    }

  }

  updateProps(){
    this.modifiedProject.emit({...this.intProps});
  }

  ngDoCheck(){
    this.translate.stream('FORM.' + String(this.label).toUpperCase()).subscribe({
      next: (x:any)=>this.translatedLabel = x
    });
    
    //build form name
    this.inputName.en = String(this.propName + "[en]");
    this.inputName.fr = String(this.propName + "[fr]");
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.propName!==""){
      this.intProps[this.propName].en = changes["properties"].currentValue[this.propName]["en"];
      this.intProps[this.propName].fr = changes["properties"].currentValue[this.propName]["fr"];
    }
  }
}
