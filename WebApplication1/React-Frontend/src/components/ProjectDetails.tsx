import React from 'react';
import {ProjectDetailsDisplay} from "./ProjectDetailsDisplay";
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";

interface Props{
    details:any;
}

class ProjectDetails extends React.Component<Props> {

    render() {          
        return (
            <div className="col-12 col-md-6 my-3 my-md-4">
               <ProjectDetailsDisplay details={this.props.details}/>
            </div>

            )
    }
}

export default connect(mapStore,null)(ProjectDetails)
