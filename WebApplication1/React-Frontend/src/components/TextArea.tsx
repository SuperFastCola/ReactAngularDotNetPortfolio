interface Props{
    name:string;
    language:string;
    defaultValue:string;
    callback(payload:any):any;
}
const TextArea = (props:Props)=>{
    return ( 
        <textarea className="form-control form-control-sm" name={props.name} data-lang={props.language} defaultValue={props.defaultValue} onBlur={props.callback}/>
    );
  }

export default TextArea;


