import React from 'react';
import { connect } from 'react-redux';
import { setErrorObject } from '../redux/actions';
import { mapStore } from '../redux/mapStore';
import { ErrorObject, ImageSubType, ProjectDefinition, ProjectsInterface} from '../types/projects';
import ImageDisplay from './ImageDisplay';
import { Ajaxer } from '../utilities/Ajaxer';
import { KeyGenerator } from '../utilities/KeyGenerator';

interface Props{
    sizes:any;
    projectid:number | null | undefined;
    indice:number;
    order: number;
    show?:boolean;
    language:string;
    errorMessage?: string;
    projects?:any;
    updateParentState?(payload:any):any;
    removeHandler?(payload:any):any;
    setErrorObject?(payload:any):any;
}

interface State{
    show:boolean;
    sizes:any;
    indice:number;
    order: number;
    loading: boolean;
}

class ImageBase extends React.Component<Props,State> {
    targetInputElement:any;
    keyGen:KeyGenerator = new KeyGenerator();
    ajaxer:any = new Ajaxer();
    imageRef:React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props:Props) {
        super(props);
        this.targetInputElement = null;
        this.state = {
            show:this.props.show??false, 
            sizes: this.props.sizes,
            indice:  this.props.indice,
            order: this.props.order,
            loading: false
        };

        this.removeFile =  this.removeFile.bind(this);
        this.sendNewFile = this.sendNewFile.bind(this);
        this.afterUpload = this.afterUpload.bind(this);
        this.createBlob = this.createBlob.bind(this);
        this.showHide = this.showHide.bind(this);
        this.displayErrorMessage = this.displayErrorMessage.bind(this);
        this.setFileRef= this.setFileRef.bind(this);
        this.displayImageName = this.displayImageName.bind(this);
        
    }

    displayErrorMessage(data:any){
        if(this.props.setErrorObject!==undefined){
            const error:ErrorObject = {
                message: (data.ExceptionMessage?? data.Message)
            }
            this.props.setErrorObject(error);
        }
    }

    async afterUpload(response:any){
        if(response!==undefined && !response.ok && response.json!==undefined){
            try{
                return await response.json().then(this.displayErrorMessage);
            }
            catch(e:any){
                console.log(e)
            }
        }
        else if (response.Message!==undefined || response.ExceptionMessage!==undefined){
            this.displayErrorMessage(response);
            return await null; 
        }

        
        var project:any = undefined;
        if(this.props.projects!==undefined){
            project = this.props.projects.find((proj:any)=>{
                return (proj.id===Number(this.props.projectid))?proj:null;
             });
        }
   
        if(project?.image[this.props.language]!==undefined && this.targetInputElement?.name!==undefined && this.targetInputElement?.files!==null){
            
            //create new image object if undefined
            if(project.image[this.props.language][this.props.indice] === undefined){
                project.image[this.props.language][this.props.indice] = {
                    order: Number(this.props.indice+1),
                    s:"",
                    m:"",
                    l:"",
                    xl:""
                };
            }

            //assign show or hide state
            project.image[this.props.language][this.props.indice].show = this.state.show;
            project.image[this.props.language][this.props.indice] = Object.assign({...project.image[this.props.language][this.props.indice],[this.targetInputElement.name]:this.targetInputElement.files[0].name});
            
            if(this.props.updateParentState!==undefined){
                //update sizes state to update image name
                var imageSizes = project.image[this.props.language].filter( (image:ImageSubType,index:number) => index===this.state.indice )[0];
                this.setState({ sizes : imageSizes, loading: false});
                this.props.updateParentState(project);
            }
        }
        return null;
    }

    createBlob(e:any){
        e.preventDefault();
        if(this.targetInputElement!==null && this.targetInputElement.files!==null){ 
            const blob = new Blob([e.target.result], {type : this.targetInputElement.files[0].type});
            
            var imageData = new FormData();
            imageData.append(this.targetInputElement.name,blob, this.targetInputElement.files[0].name);

            var request:any = {
                method: "POST", 
                mode: 'cors',
                cache: 'no-cache', 
                body: imageData,
                headers: new Headers(),
                referrerPolicy: 'no-referrer'
            };

            fetch("https://localhost:44311/api/upload/",request).catch(error =>{
                return error;
            }).then((response:any)=>response).then(this.afterUpload);  
        }
    }

    removeFile(e:any){
        e.preventDefault();
        if(e.target.dataset["size"]!==undefined){

            var project:any = undefined;
            if(this.props.projects!==undefined){
                project = this.props.projects.find((proj:any)=>{
                    return (proj.id===Number(this.props.projectid))?proj:undefined;
                 });
            }
            
            var image = project.image[this.props.language][this.props.indice];

            if(project!==undefined && image!==undefined){

                var fileToRemove = image[String(e.target.dataset["size"])];

                //if file size exists set to null to remove from object
                if(image[String(e.target.dataset["size"])]!=null){
                    image[String(e.target.dataset["size"])] = null;
                }

                //update project image object from update in store
                project.image[this.props.language][this.props.indice] = Object.assign({...image});

                if(this.props.updateParentState!==undefined && fileToRemove!==null){
                    this.setState({ sizes : project.image[this.props.language][this.props.indice]});
                    this.props.updateParentState(project);
               
                    this.ajaxer.method = "DELETE";
                    this.ajaxer.contentType = "json";
                    this.ajaxer.body = JSON.stringify({"ImageName":fileToRemove});
                    this.ajaxer.getData("https://localhost:44311/api/imagedelete/").then(this.afterUpload.bind(this));                }
            }
        }
    }

    sendNewFile(e:any){
        e.preventDefault();
        if(this.targetInputElement.files!==null && this.targetInputElement.files!==null && this.targetInputElement.files.length>0){
            var fileReader = new FileReader();
            this.setState({loading:true});
            fileReader.addEventListener("loadend",this.createBlob);
            fileReader.readAsArrayBuffer(this.targetInputElement.files[0]);
        }
        
    }

    showHide(e:any){
        e.preventDefault();
        this.setState({show:!this.state.show});
    }

    setFileRef(e:any){
        this.targetInputElement = e.target;
    }

    displayImageName(){
        for(const [key,value] of Object.entries(this.state.sizes)){
            if(!key.match(/order|id|show/) && value!==null){
                return value;
            }
        }
        return "No image Source";
    }

    render() {      
        var imagesSizes:any = [];
        var collapseStyle = `collapse ${(this.state.show?"show":"")}`;
        var collapseText = (this.state.show?"hide":"show");
        var orderClass= (this.state.order)?`flex-order-${this.state.order}`:"";
        var holderCSS = `border mb-3 px-3 ${orderClass}`;

        for(const [key, value] of Object.entries(this.props.sizes)){
            if(!String(key).match(/order|show|id/)){
                var removeButton = (value!==null && String(value).length>0)?<button className="btn btn-primary btn-sm" data-lang={this.props.language} data-size={key}  key={this.keyGen.createItemKey()} data-name={String(key+this.state.indice)} onClick={this.removeFile} >Remove</button>:null;
                var picture = (value!==null)?<ImageDisplay key={this.keyGen.createItemKey()} fileName={String(value)}/>:null;

                imagesSizes.push(
                        <div key={this.keyGen.createItemKey()} className="row mx-0 mb-2 border">
                            {picture}
                            <div className="col-12 mb-2">
                                <label className="form-label text-capitalize">{key}: {value} </label>
                                <input className={`form-control form-control-sm mb-1 ${(this.state.loading)?"d-none":""}`} data-lang={this.props.language}  name={key} data-name={String(key+this.state.indice)} data-index={this.state.indice} onChange={this.setFileRef} type="file" />
                                <div className={`spinner-border d-block mb-3 ${(!this.state.loading)?"d-none":""}`} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="d-flex">
                                    <button className="btn btn-primary btn-sm me-1" data-size={key} data-name={String(key+this.state.indice)} data-lang={this.props.language} onClick={this.sendNewFile}>Upload</button>
                                    {removeButton}
                                </div>
                            </div>
                        </div>
                        );
                }
            }
        
        return (
            <div className={holderCSS} data-index={this.state.indice} data-lang={this.props.language}>
                <div className="d-flex my-3"><h6 className="flex-fill">{this.displayImageName()} {this.state.indice}</h6>
                <button className="btn btn-primary me-1" onClick={this.showHide}>{collapseText}</button>
                <button className="btn btn-danger" data-lang={this.props.language}  data-indice={this.props.indice} onClick={this.props.removeHandler}>Remove</button></div>
                <div className={collapseStyle}>{imagesSizes}</div>  
            </div>
        )
    }
}

export const Image = connect(mapStore,{setErrorObject})(ImageBase);
