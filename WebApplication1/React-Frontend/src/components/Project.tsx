import {connect} from 'react-redux';
import React from "react";
import { mapStore } from "../redux/mapStore";
import {setErrorObject, storeProjects} from "../redux/actions";
import {ErrorObject, ProjectDefinition, ProjectsInterface} from "../types/projects";
import { Ajaxer } from '../utilities/Ajaxer';
import ProjectDetails from './ProjectDetails';
import {Link} from "react-router-dom";

type Props = {
    projects?:ProjectsInterface;
    storeProjects?(payload:any):any;
    setErrorObject?(payload:any):any;
}

type State =  { 
    allProjects: ProjectDefinition[]
};

class ProjectBase extends React.Component<Props, State> {
    ajaxer:any = new Ajaxer();

    constructor(props:Props){
        super(props);
        this.returnProjects = this.returnProjects.bind(this);
    }

    componentDidMount() {
        if(this.props.projects === undefined){
            try{                
                this.ajaxer.method = "GET";
                this.ajaxer.contentType = "json";
                this.ajaxer.getData("https://localhost:44311//api/values").then(this.returnProjects);

            }
            catch(e){
                throw new Error(`Error: ${e}`);
            }
        }
    }

    returnProjects(data:any){
        if(data!=null && data.projects!==undefined){
            if( this.props.storeProjects!==undefined){
                this.props.storeProjects(data.projects);
            }
        }
        else{
            if( this.props.setErrorObject!==undefined){
                const error:ErrorObject = {
                    message:data.toString()
                }
                this.props.setErrorObject(error);
            }
        }

    }
    render() {  

        var projectholder:any = [];
        if(this.props.projects!==undefined){
            for (const [key, value] of Object.entries(this.props.projects)) {
                projectholder.push(<ProjectDetails key={key} details={value}/>);
            }
        }
        return (  
        <div className="row">
            <div>
            <Link className="btn btn-primary my-3" to="/new">New Project</Link>
            </div>
            {projectholder} 
        </div>
        )     
    }
};

export const Project = connect(mapStore,{storeProjects,setErrorObject})(ProjectBase);
