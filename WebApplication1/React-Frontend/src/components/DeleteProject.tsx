import React from 'react';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {removeProject, setErrorObject} from "../redux/actions";
import { ErrorObject, ProjectDefinition } from '../types/projects';
import { Ajaxer } from '../utilities/Ajaxer';


interface Props{
    details:ProjectDefinition
    buttonName: string;
    setErrorObject?(payload:ErrorObject | null):any;
    removeProject?(payload:ProjectDefinition | null):ProjectDefinition;
}

class DeleteProject extends React.Component<Props> {
    ajaxer:any = new Ajaxer();
    
    constructor(props:Props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.performAction = this.performAction.bind(this);
        this.afterDeletion = this.afterDeletion.bind(this); 
    }

    afterDeletion(data:any){
        if( data.ExceptionMessage!==undefined && this.props.setErrorObject!==undefined){
            const error:ErrorObject = {
                message:data.ExceptionMessage.toString()
            }
            this.props.setErrorObject(error);
        }
        //proceed as normal
        else if(this.props.setErrorObject!==undefined && this.props.removeProject!==undefined){
            this.props.removeProject(this.props.details);
            this.props.setErrorObject(null);
        }
    }

    performAction(e:Event){
        try{
            this.ajaxer.method = "DELETE";
            this.ajaxer.contentType = "json";
            this.ajaxer.body = JSON.stringify(this.props.details);
            this.ajaxer.getData(`https://localhost:44311/api/deleteproject/${this.props.details?.id}`).then(this.afterDeletion);
        }
        catch(e){
            throw new Error(`Error: ${e}`);
        }
    }

    deleteProject(e:any){
        if(this.props.setErrorObject !== undefined){
            var error:ErrorObject = {
                message: `Delete Project ${this.props.details?.name["en"]}?`,
                callback: this.performAction
            }
            this.props.setErrorObject(error);
        }
    }

    render() {       
        return (
            <button className="btn btn-danger me-0 me-md-1" data-name={this.props.buttonName} onClick={this.deleteProject}>Delete</button>
        )
    }
}

export default connect(mapStore,{removeProject,setErrorObject})(DeleteProject)