import { UrlSubType, UrlType } from "../types/projects";
import InputField from "./InputFIeld";
import LabelArea from "./LabelArea";

interface Props{
    urlObject:UrlSubType;
    language?:string;
    dataIndex:number;
    callback(payload:any):any;
    removeCallback(payload:any):any;
}
const UrlFieldSet = (props:Props)=>{

    function displayUrlElements(){
        var elements = [];
        for (const [key, value] of Object.entries(props.urlObject)) {
            if(key==="text" || key === "link"){
                var itemKey = Math.ceil((Math.random() * 100) * 1000);
                elements.push(
                    <div key={itemKey}  className={`col-12 ${(key==="link"?"mb-2":null)}`}>
                        <LabelArea text={(key==="link"?"Url":"Url Link Text")}/>
                        {<InputField name={key} language={props.language} dataIndex={props.dataIndex} defaultValue={value} callback={props.callback}/> }
                    </div>
                );
            }
        }   
        return elements;
    }

    return ( 
        <div className="row mb-2 border">
            {displayUrlElements()}
            <div className="col-12"><button className="btn btn-danger btn-sm my-2 my-md-3" data-lang={props.language} data-index={props.dataIndex} onClick={props.removeCallback}>Remove</button></div>
        </div>
    );
  }

export default UrlFieldSet;