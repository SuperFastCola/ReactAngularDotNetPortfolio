import React from 'react';
import { Ajaxer } from '../utilities/Ajaxer';

const UpdateProject = (props)=>{

    const ajaxer = new Ajaxer();
 
    function sendDataOnCLick(e){
        e.preventDefault();     
        //https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
        const cleanedProject = JSON.parse(JSON.stringify(props.details), omitTypename);

        ajaxer.method = "PUT";
        ajaxer.contentType = "json";
        ajaxer.body = JSON.stringify(cleanedProject);

        ajaxer.getData("https://localhost:44311/api/values/" + props.details.id).then(props.afterUpdate.bind(this,e.target.dataset,props.details));
    }


    return (
            <button className="btn btn-primary" data-name={props.buttonName} onClick={sendDataOnCLick}>Update</button>
    )
    
}

export default UpdateProject;