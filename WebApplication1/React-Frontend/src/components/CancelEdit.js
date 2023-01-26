
const CancelEdit = (props)=>{

    return (
            <button className="btn btn-warning ms-0 ms-md-1" data-name={props.buttonName} onClick={props.afterUpdate}>Cancel</button>
    )
    
}

export default CancelEdit;
