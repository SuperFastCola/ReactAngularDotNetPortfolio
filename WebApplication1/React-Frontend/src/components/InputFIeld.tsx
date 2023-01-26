interface Props{
    name:string;
    language?:string;
    defaultValue:string;
    dataIndex?:number;
    callback(payload:any):any;
}
const InputField = (props:Props)=>{
    return ( 
        <input className="form-control form-control-sm" data-lang={props.language} type="text" name={props.name} data-index={props.dataIndex} defaultValue={props.defaultValue} onBlur={props.callback}/>
    );
  }

export default InputField;


