import React from 'react';
import {ImageSubType} from "../types/projects";

interface Props{
   fileName?: string;
   sizes?:ImageSubType;
}

class ImageDisplay extends React.Component<Props> {
    filePath:string;
    breakpoints:any;
    srcSet:any = [];

    constructor(props:Props) {
        super(props);
        this.filePath = "/images/";
        this.breakpoints = {
            s:'(max-width: 414px)',
            m:'(max-width: 767px)',
            l:'(min-width: 768px)',
            xl:'(min-width: 1200px)'
        };


        this.displayPictureElement = this.displayPictureElement.bind(this);
    }

    displayPictureElement(){
        var newKey = Math.ceil(Math.random() * 100 ) * 1000;
        var newKey2 = Math.ceil(Math.random() * 100 ) * 1001;
        var newKey3 = Math.ceil(Math.random() * 100 ) * 1002;

        this.srcSet = [<source srcSet={`${this.filePath}${this.props.fileName}`} key={newKey} />];
        var imgElement = null;
        var imageSizes = [];

        if(this.props.sizes!==undefined){
            for (const [key, value] of Object.entries(this.props.sizes)) {
                if(value!==null && value!==undefined && String(key).match(/^(s|m|l|xl)$/) && String(value).match(/\w/)){
                    imageSizes.push([this.breakpoints[key],value]);
                    
                    if(imgElement===null){
                        imgElement = <img className="w-100" src={`${this.filePath}${value}`} alt={value.toString()} key={newKey2}/>
                    }
                }
            };

            this.srcSet = imageSizes.map((src:any, index:number) => (<source srcSet={this.filePath + src[1]} media={src[0]} key={newKey3} />));
            this.srcSet.push(imgElement);
        }
        else{
            this.srcSet.push( <img className="w-100" key={newKey2} src={`${this.filePath}${this.props.fileName}`} alt={this.props.fileName?.toString()}/>); 
        }
        return this.srcSet;
    }

    render() {              
        return (
            <div>
                <picture className="w-100">
                 {this.displayPictureElement()}
                </picture>
            </div>
        )
    }
}

export default ImageDisplay;

/*

<picture>
<source media="(min-width: 992px)" srcset="">
<source media="(min-width: 768px)" srcset="">
<source media="(min-width: 576px)" srcset="">
<img class="" title="" alt="" src="">
</picture>
*/
