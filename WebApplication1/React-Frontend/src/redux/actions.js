import { ACCESS_TOKEN, ADD_PROJECT, GENERATE_ERROR, REMOVE_PROJECT, STORE_PROJECTS, UPDATE_PROJECT } from "./actionTypes";

//actions are added to each component by: export default connect(state,{actionname})(component) 
//payload is passed when the action function is used in the component

  export const storeProjects = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    return {
      type: STORE_PROJECTS,
      "projects":payload
    }
  }


  export const addProject = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    return {
      type: ADD_PROJECT,
      "projectToAdd":payload
    }
  }

  export const removeProject = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    return {
      type: REMOVE_PROJECT,
      "projectToRemove":payload
    }
  }


  export const updateProject = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    return {
      type: UPDATE_PROJECT,
      "projectToUpdate":payload
    }
  }


export const accessToken = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    console.log("seting access token",payload);
    return {
      type: ACCESS_TOKEN,
      "accessToken":payload
    }
}

export const setErrorObject = payload => {
  return {
    type: GENERATE_ERROR,
    "errorObject":{...payload}
  }
}
