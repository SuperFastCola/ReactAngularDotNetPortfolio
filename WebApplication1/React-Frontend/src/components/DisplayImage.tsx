import React from 'react';
import {ImageSubType} from "../types/projects";

interface Props{
    sizes:ImageSubType;
}

class DisplayImage extends React.Component<Props> {
    constructor(props:Props){
        super(props);

    }

	render() {
        var breakpoints = {
            's':'(max-width: 414px)',
            'm':'(max-width: 767px)',
            'l':'(min-width: 768px)',
            'xl':'(min-width: 1200px)'
        };

        var sources = this.props.sizes;
        var path = "/public/images/";

        //     {/*sources.map((src, index) => (<source srcSet={this.props.path + src[1]} media={breakpoints[src[0]]} key={index} /> ))}
        return (
            <div className="projectDisplayImage">
                <picture>
                    <img src={path + this.props.sizes.s} alt={"Text"} />
                </picture>
            </div>
	    )
  }
}


export default DisplayImage;