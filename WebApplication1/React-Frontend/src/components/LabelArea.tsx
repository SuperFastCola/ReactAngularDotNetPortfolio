interface Props{
    text:string;
}
const LabelArea = (props:Props)=>{
    return ( 
        <label className="form-label text-capitalize">{props.text}</label>
    );
  }

export default LabelArea;

