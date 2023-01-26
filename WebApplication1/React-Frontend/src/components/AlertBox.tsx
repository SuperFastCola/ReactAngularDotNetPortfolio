import {connect} from 'react-redux';
import React from "react";
import {setErrorObject} from "../redux/actions";
import { ErrorObject } from '../types/projects';

type Props = {
    errorObject: ErrorObject | undefined | null;
    setErrorObject?(payload:any):any;
}


class AlertBox extends React.Component<Props> {

    constructor(props:Props){
        super(props);
        this.renderAlert = this.renderAlert.bind(this);
        this.clearErrorMessage = this.clearErrorMessage.bind(this);
    }

    showCSS(){
        if(this.props.errorObject!==null && this.props.errorObject!==undefined ){
            return "modal show";
        }
        return "modal";
    }

    displayCSS(){
        if(this.props.errorObject!==null && this.props.errorObject!==undefined ){
            return ;
        }
        return {display:"none"};
    }

    clearErrorMessage(e:any){
        e.preventDefault();
        if( this.props.setErrorObject!==undefined){
            this.props.setErrorObject(null);
        }
    }

    renderAlert(){
        if(this.props.errorObject!==null && this.props.errorObject?.message!==undefined ){

            var confirmationButton =  (this.props.errorObject.callback!==undefined)?
                <div className="modal-footer me-0 me-md-1">
                    <button className="btn btn-warning" data-name="cancel" onClick={this.clearErrorMessage}>Cancel</button>
                    <button className="btn btn-danger" data-name="confirm" onClick={this.props.errorObject.callback}>Confirm</button>
                </div>:null;

            var closeButton = ( (this.props.errorObject.callback===undefined))?<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.clearErrorMessage}></button>
:null;

            return (
                <>
                <div className="modal" style={{display:"block"}} tabIndex={-1} >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Attention</h5>
                        {closeButton}
                    </div>
                    <div className="modal-body">
                      <p>{this.props.errorObject.message}</p>
                    </div>
                   {confirmationButton}
                  </div>
                </div>
              </div>
              <div className='modal-backdrop show' style={{display:"block"}}/>
              </>
            );
        }
        return null;
    }

    render(){
        return(
            <>
            {this.renderAlert()}
            </>
            )
    }
}

export const Alert = connect(null,{setErrorObject})(AlertBox);