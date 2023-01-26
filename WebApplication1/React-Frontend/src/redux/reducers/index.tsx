import { combineReducers } from "redux";
import ProjectDetails from "../../components/ProjectDetails";
import { ProjectDefinition } from "../../types/projects";
import { EDIT_PROJECT, ACCESS_TOKEN, UPDATE_PROJECT, STORE_PROJECTS, GENERATE_ERROR, ADD_PROJECT, REMOVE_PROJECT } from "../actionTypes";

const initialState = {
      accessToken: null,
      selectedProject: undefined,
      projects: undefined,
      errorMessage: null,
};

const projectsReducer = function(state = initialState, action:any) {
  //switches by the constant 
  switch (action.type) {
    case ACCESS_TOKEN: {
      const newState = {...state, accessToken: action.accessToken};
      return newState;
    }

    case STORE_PROJECTS: {
      var object =  {...state, projects: action.projects };
      return object;
    }

    case ADD_PROJECT: {
      var newProjects =  Array(state.projects)[0];
      newProjects.push(action.projectToAdd);
      return {...state, projects: newProjects };
    }

    case REMOVE_PROJECT: {
      var allProjects =  Array(state.projects)[0];
      const projectsWithoutDeleted: ProjectDefinition[] = 
      allProjects.filter( (proj:ProjectDefinition) => proj.id !== action.projectToRemove.id);
      
      return {...state, projects: projectsWithoutDeleted };
    }

    case GENERATE_ERROR: { 
      return {...state, errorObject: action.errorObject };
    }

    case UPDATE_PROJECT: {
      var projects = [];
      
      for (const [key, value] of Object.entries(Array(state.projects)[0])) {
        if(Object(value).id === action.projectToUpdate.id){
          projects.push(action.projectToUpdate);
        }else{
          projects.push(value);
        }
      };

      return {...state, projects: projects };
    }
  
    default:
      return state;
  }
}

//combine multiple reducers into one by compartimentalizing the code
export default combineReducers({projectsReducer});