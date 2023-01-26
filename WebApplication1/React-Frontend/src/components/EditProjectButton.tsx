import React from 'react';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import { Link } from 'react-router-dom';


interface Props{
    details:any;
    buttonName: string;
}

const EditProjectButton = (props:Props)=>{

    return (
        <>
        <Link className="btn btn-primary me-0 me-md-1" to={`/${props.details.id}`} data-name={props.buttonName}>Edit</Link>
        </>
    )
    
}

export default connect(mapStore)(EditProjectButton)