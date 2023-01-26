class Ajaxer{  
    request:any;
    putData:any;

    constructor() {
        //set request parameters
        this.request = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            body: null,
            headers: new Headers(),
            redirect: 'manual', // manual, *follow, error
            referrerPolicy: 'no-referrer'
        };
    }

    set body(body:any){
        this.request.body = body;
    }

    set method(type:string){
        this.request.method = type;
    }

    set contentType(type:string){
        var headerType = (type??null);
        switch(headerType){
            default:
                this.request.headers.append( 'Content-Type','application/json')
            break;
        }
    };
    
    public getData = async (url:string)=>{        
        var response = await fetch(url, this.request).catch(error =>{
            //set error in store to display message
            return error;
        })
        
        if(response.ok){
            if(!this.request.headers.has("Content-Type")){
                return await response;
            }else{
                return await response.json(); // parses JSON response into native JavaScript objects
            }
        }
        else{
            if(response.text!==undefined && response.json!==undefined){
                return await response.json();
            }
            else{
                return response;
            }
           
        }
    }
};

export {Ajaxer};