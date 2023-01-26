import { useNavigate, useLocation } from "react-router-dom";
import { ProjectDefinition } from "../types/projects";
import { ProjectDetailsEdit } from "./ProjectDetailsEdit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {connect} from 'react-redux';
import { mapStore } from "../redux/mapStore";

const NewProject = (props:any)=>{
    let location = useLocation();
    const projects:any = useSelector((state:any) => state.projectsReducer.projects);
    const navigate = useNavigate();
    const emptyProject:ProjectDefinition = {
        id: (projects!==undefined && projects.length!==undefined)?Number(projects[projects.length-1].id)+1:0,
        name: {en:null,fr:null},
        description: {en:null,fr:null},
        role: {en:null,fr:null},
        tech: {en:[],fr:[]},
        image: {en:[],fr:[]},
        url: {en:[],fr:[]},
        projid: "",
        type: []
    };

    useEffect(() => {
        if(projects===undefined){
            return navigate("/");
        }        
    })

    return ( 
        <div className="row  justify-content-center">
            <div className="col-12 col-md-6 my-3 my-md-4">
                <ProjectDetailsEdit details={emptyProject} newProject={true} />
            </div>
        </div>
    );
  }

  export default connect(mapStore)(NewProject);


