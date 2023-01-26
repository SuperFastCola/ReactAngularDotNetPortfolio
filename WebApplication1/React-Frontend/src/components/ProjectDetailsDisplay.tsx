import React, { Fragment } from 'react';
import EditProjectButton from './EditProjectButton';
import {ProjectDefinition} from "../types/projects";
import DeleteProject from './DeleteProject';

type Props = {
    details:ProjectDefinition;
}

class ProjectDetailsDisplay extends React.Component<Props> {
    render() {
        return (
            <Fragment>
                <h2 className="text-capitalize">{this.props.details.name.en}</h2>
                <h5 data-testid="project-role">{this.props.details.role.en}</h5>
                <p>{this.props.details.description.en}</p>
                <div>
                <EditProjectButton details={this.props.details} buttonName="Edit"/>
                <DeleteProject details={this.props.details} buttonName="Edit"/>
                </div>
            </Fragment>
        )
    }
}
export {ProjectDetailsDisplay}

