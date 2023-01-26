import './App.css';
import {connect} from 'react-redux';
import { mapStore } from "./redux/mapStore";
import {Project} from "./components/Project";
import React from 'react';
import {ErrorObject, ProjectsInterface } from './types/projects';
import { Alert } from './components/AlertBox';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NewProject from './components/NewProject';
import EditProject from './components/EditProject';

type Props = {
  errorObject?:ErrorObject | undefined | null;
  projects?:ProjectsInterface;
}

class AppBase extends React.Component<Props> {

  render() {      
    return ( 
      <>
        <Alert errorObject={this.props.errorObject}/>
        <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Project/>} />
            <Route path="/:id" element={<EditProject />} />
            <Route path="/new" element={<NewProject />} />
          </Routes>
        </Router>
        </div>
      </>
    )
  
  }
}

export const App = connect(mapStore)(AppBase);
