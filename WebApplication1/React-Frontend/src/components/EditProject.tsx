import { useNavigate, useParams } from "react-router-dom";
import { ProjectDetailsEdit } from "./ProjectDetailsEdit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {connect} from 'react-redux';
import { mapStore } from "../redux/mapStore";

const EditProject = (props:any)=>{
    const { id } = useParams();
    var projects:any = useSelector((state:any) => state.projectsReducer.projects);
    var selectedProject = undefined;

    const navigate = useNavigate();

    useEffect(() => {
        if(projects===undefined){
            return navigate("/");
        }        
    })
    
    //find project within selected projects
    if(projects!==undefined){
        selectedProject = projects.find((proj:any)=>{
           return (proj.id===Number(id))?proj:null;
        });
    }

    return ( 
        <div className="row  justify-content-center">
            <div className="col-12 col-md-6 my-3 my-md-4">
                <ProjectDetailsEdit details={selectedProject} existingProject={true}/> 
            </div>
        </div>
    );
  }

  export default connect(mapStore)(EditProject);


