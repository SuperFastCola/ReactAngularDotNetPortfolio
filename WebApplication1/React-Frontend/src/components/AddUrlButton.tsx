interface Props{
    language?:string;
    callback(payload:any):any;
}
const AddURLButton = (props:Props)=>{
    return ( 
        <button className="btn btn-light btn-sm my-2 my-md-3" data-lang={props.language} onClick={props.callback}>Add Url</button>
    );
  }

export default AddURLButton;