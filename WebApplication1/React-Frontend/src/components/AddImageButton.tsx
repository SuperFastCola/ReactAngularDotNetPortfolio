interface Props{
    language:string;
    callback(payload:any):any;
}
const AddImageButton = (props:Props)=>{
    return ( 
        <button className="btn btn-light btn-sm my-2 my-md-3" data-lang={props.language} onClick={props.callback}>Add Image</button>
    );
  }

export default AddImageButton;