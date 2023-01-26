import React, { createRef, Fragment } from 'react';
import UpdateProject from './UpdateProjectButton';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {addProject,updateProject} from "../redux/actions";
import CancelEdit from './CancelEdit';
import {Image} from './Image';
import {ImageSubType, ImageType, ProjectDefinition, UrlSubType, UrlType} from "../types/projects";
import { Link, Navigate, redirect } from 'react-router-dom';
import TextArea from './TextArea';
import InputField from './InputFIeld';
import LabelArea from './LabelArea';
import UrlFieldSet from './UrlFieldSet';
import AddUrlButton from './AddUrlButton';
import AddImageButton from './AddImageButton';
import { KeyGenerator } from '../utilities/KeyGenerator';

type Props = {
    details:any;
    path?:string;
    updateProject?(payload:any):any;
    addProject?(payload:any):any;
    newProject?:boolean;
    existingProject?:boolean;
}

type DraggedItem= {
    className: string;
    pageY:number;
}

type ProjectDetailsState = ProjectDefinition & DraggedItem;

class ProjectDetailsEditComponent extends React.Component<Props, ProjectDetailsState> {
    formRef: React.RefObject<HTMLFormElement>;
    imageList: React.RefObject<HTMLDivElement>;
    draggingParent:any;
    keyGen:KeyGenerator = new KeyGenerator();
    constructor(props:Props) {
        super(props);
        this.state = {...this.props.details, projectAdded:false };   
        this.formRef = React.createRef();
        this.imageList = React.createRef();
        this.draggingParent = {
            en: React.createRef(),
            fr: React.createRef()
        };
        this.changeProperty = this.changeProperty.bind(this);
        this.createFormLines = this.createFormLines.bind(this);
        this.afterUpdateHandler = this.afterUpdateHandler.bind(this);
        this.changeUrlProperty = this.changeUrlProperty.bind(this);
        this.addURLFormElement = this.addURLFormElement.bind(this);
        this.removeURLFormElement = this.removeURLFormElement.bind(this);
        this.dropEndHandler = this.dropEndHandler.bind(this);
        this.addImageFormElement = this.addImageFormElement.bind(this);
        this.removeImageFormElement = this.removeImageFormElement.bind(this);
        this.updateProjectDetailsState =  this.updateProjectDetailsState.bind(this);
    }

    changeProperty(e:any){
        e.preventDefault();
        var originalState = this.state[e.target.name];

        if(e.target.name === "type"){
            var cleanTypes = (e.target.value.replace(" ","")).split(",");
            originalState = cleanTypes;
        }
        else{
            originalState[e.target.dataset["lang"]] = e.target.value;
        }
        this.setState({[e.target.name]:originalState});
    }

    changeUrlProperty(e:any){
        e.preventDefault();
        var language:string = e.target.dataset["lang"];
        var tmpUrl:UrlType = {...this.state.url};

        var index = e.target.dataset["index"];
        tmpUrl[language][index][e.target.name] = e.target.value;
        this.setState({url: tmpUrl});

    }

    afterUpdateHandler(dataset:any,data:any){
        if(dataset["name"] !== undefined){
            var buttonName = String(dataset["name"]).toLowerCase();
            switch(buttonName){
                case "update":
                    if(this.props.updateProject!==undefined && data !== undefined){
                        this.setState({...data} );  
                        this.props.updateProject(data);
                    }
                break;

                case "new":
                    if(this.props.addProject!==undefined && data !== undefined){
                        this.setState({...data} );
                        this.setState({projectAdded:true}); 
                        this.props.addProject(data);
                    }
                break;
            }
        }

        this.setState({projectAdded:true});
        
    }

    addImageFormElement(e:any){
        e.preventDefault();
        var tmpImg:any = [];
        var language:string = e.target.dataset["lang"];
        
        if(this.state.image!=null){
            tmpImg = {...this.state.image};
        }
        
        tmpImg[language].push({
            order:(this.state.image[language] !== null)?Number(this.state.image[language].length)+1:1,
            s:null,
            m:null,
            l:null,
            xl:null
        })        
        this.setState({image:tmpImg});
    }

    removeImageFormElement(e:any){
        e.preventDefault();
        var language:string = e.target.dataset["lang"];
        var originalState = this.state.image;
        var tmpImg = originalState[language].filter( (item:ImageSubType,index:number) => {
            if(index !== Number(e.target.dataset["indice"])){
                return item;
            }
            return null;
        });
        originalState[language] = tmpImg;
        this.setState({image:originalState});
    }


    addURLFormElement(e:any){
        e.preventDefault();
        var tmpUrl:any;

        if(this.state.url!=null){
            tmpUrl = this.state.url;
        }

        tmpUrl[e.target.dataset["lang"]].push({
            "link":"",
            "text":"",
        })        
        this.setState({url:{...tmpUrl}});
    }

    ///passed to child component to update this component state for updating
    updateProjectDetailsState(stateFromChild:any){
        this.setState({image:stateFromChild.image});
    }

    removeURLFormElement(e:any){
        e.preventDefault();
        var language:string = e.target.dataset["lang"];

        var originalState = this.state.url;
        var tmpUrl = originalState[language].filter( (item:UrlSubType,index:number) => {
            if(index !== Number(e.target.dataset["index"])){
                return item;
            }
            return null;
        });
        
        originalState[language] = tmpUrl;
        this.setState({url:originalState});

    }

    dropEndHandler(e:any,index:number){
        e.preventDefault();
        e.stopPropagation();
        var language:string = e.target.dataset["lang"];

        var targetClass = e.target.classList.value.match(/image-group-[0-9]{1,2}/);
        
        var children = this.draggingParent[language].current?.querySelectorAll("div.image-group")!;
        var targetedChild = this.draggingParent[language].current?.querySelector(`.${targetClass}`);
        var elementsOrder = [];
        
        for (const [index, element] of children.entries()) {
            let currentImage:HTMLDivElement = element as HTMLDivElement;

            //add non target to array collection
            if(currentImage.classList.value!==targetedChild?.classList.value){
                elementsOrder[currentImage.offsetTop] = currentImage;
            }
            else{
                elementsOrder[e.pageY] = targetedChild;
            }         
        }

        var newProductsOrder:any = [];
        var originalImages = this.props.details.image;
        var originalImagesForLanguage =  this.props.details.image[language]
        var orderIncrement:number = 0;

        elementsOrder.forEach( (item,index)=>{
            //cast item to HTML Div Element
            var imageHtmlItem:HTMLDivElement = item as HTMLDivElement;
            //create clone of original image data at data-index property on imageHtmlItem
            var originalImageData:ImageType = JSON.parse(JSON.stringify(originalImagesForLanguage[Number(imageHtmlItem.dataset.index)]));

            //set new order property for image
            var newImageData:ImageType = Object.assign(originalImageData,{"order":++orderIncrement});
            //push into new array
            newProductsOrder.push(newImageData);
        });

        originalImages[language] = newProductsOrder;
        this.setState({...Object.assign(this.props.details,{"image":originalImages})});
        if(this.props.updateProject){
            this.props.updateProject(this.state);
        }
    }

    createFormLines(){
        var formLines:any = [];
        var i = 0;
        for (const property in this.state) {
            if(property.match(/^(name|description|role|tech)$/)){

                formLines.push(<LabelArea text={property} key={this.keyGen.createItemKey()}/>);

                for (const [key, value] of Object.entries(this.state[property])) {
                    if(key==="en" || key ==="fr"){
                        formLines.push(<div key={++i} className="mb-2">
                        {
                            (   
                                property.match(/description|tech/)?
                                <TextArea name={property} key={this.keyGen.createItemKey()} language={key} defaultValue={this.state[property as keyof ProjectDefinition][key]} callback={this.changeProperty}/>
                                :
                                <InputField name={property} key={this.keyGen.createItemKey()} language={key} defaultValue={this.state[property as keyof ProjectDefinition][key]} callback={this.changeProperty}/>
                            )
                        }
                    </div>);
                    }
                };

            }
            if(property==="type"){
                formLines.push(<LabelArea text={property} key={this.keyGen.createItemKey()}/>);
                formLines.push(<InputField name={property} key={this.keyGen.createItemKey()} defaultValue={this.state[property as keyof ProjectDefinition]} callback={this.changeProperty}/>);
            }          
            else if(property==="image" ){
                let imagesObject:any =[];

                for (const [key, value] of Object.entries(this.state[property])) {
                    if(key==="en" || key ==="fr"){
                        var imageEntries = this.state[property][key];

                        imagesObject = imageEntries?.map( (item:ImageSubType, index:number) =>{
                            return( 
                                <Fragment key={this.keyGen.createItemKey()} >
                                {(index===0)?<LabelArea text={key} key={this.keyGen.createItemKey()}/>:null}
                                <div className={`image-group image-group-${index}`} draggable="true" data-lang={key}  onDragEnd={e=>{this.dropEndHandler(e,index)}} data-index={index} key={this.keyGen.createItemKey()}>
                                    <Image sizes={item} projectid={this.state.id} language={key}  show={item.show} order={item.order} indice={index}  key={this.keyGen.createItemKey()} updateParentState={this.updateProjectDetailsState} removeHandler={this.removeImageFormElement} />
                                </div>
                                </Fragment>
                            )
                        });

                        formLines.push(
                            <div key={this.keyGen.createItemKey()} ref={this.draggingParent[key]} data-lang={key} className="d-flex flex-column border p-4 my-3" >
                                {imagesObject}
                                <AddImageButton key={this.keyGen.createItemKey()} language={key} callback={this.addImageFormElement}/>
                            </div>
                        );
                    }
                }
              
            }

            else if(property==="url"){
                for (const [key, value] of Object.entries(this.state[property])) {
                    if(key==="en" || key ==="fr"){
                        let urlsCollection:any =[]; 
                        if(this.state[property]!=null){
                            var urlEntries = this.state.url[key];
                            urlsCollection = urlEntries?.map( (u:any, index:number) => {
                                return <UrlFieldSet key={this.keyGen.createItemKey()} language={key} urlObject={u} dataIndex={index} callback={this.changeUrlProperty} removeCallback={this.removeURLFormElement} />
                            });
                        }
                        
                        formLines.push(
                            <div key={this.keyGen.createItemKey()} className="border p-4 my-3">
                                {urlsCollection}
                                <AddUrlButton key={this.keyGen.createItemKey()}  language={key}  callback={this.addURLFormElement} />
                            </div>
                        );
                    }
                }
            }
        }

        return formLines;
    }

    displayUpdateButton(){
        if(this.props.newProject!==undefined && this.props.newProject){
            return <UpdateProject details={this.state} buttonName="New" afterUpdate={this.afterUpdateHandler}/>;
        }
        return <UpdateProject details={this.state} buttonName="Update" afterUpdate={this.afterUpdateHandler}/>;
    }

    displayCancelButton(){
        if(this.props.newProject!==undefined && this.props.newProject){
            return <Link className="btn btn-warning ms-0 ms-md-1" to="..">Cancel</Link>
        }
        return <CancelEdit buttonName="Cancel" afterUpdate={this.afterUpdateHandler}/>

    }

    render() {
        return (
            <Fragment>
            <h1>{(this.props.newProject)?"New Project":"Update Project"}</h1>
            <form className="mb-3 mb-md-4" ref={this.formRef}>
                {this.createFormLines()}
            </form>
             <div>
                {this.displayUpdateButton()}
                {this.displayCancelButton()}
                {(this.state.projectAdded)?<Navigate to=".." />:null}
            </div>
            </Fragment>
        )
    }
}

export const ProjectDetailsEdit = connect(mapStore,{updateProject,addProject})(ProjectDetailsEditComponent);