import renderer from 'react-test-renderer';
import {ProjectDetailsDisplay} from "./ProjectDetailsDisplay";
import { Provider } from 'react-redux';
import store from '../redux/store';
import {render, fireEvent, screen} from '@testing-library/react'


describe('Test', () => {
  it('Find Role', async () => {

    const projectTest =     {
      "id": 1,
      "name": "React/Redux with Spotify",
      "description": "Framework Exploration with Spotify API",
      "role": "Web Design, Development and Deployment",
      "tech": "\u003Cul\u003E\u003Cli\u003EAmazon Web Services\u003C/li\u003E\u003Cli\u003EReact JS\u003C/li\u003E\u003Cli\u003ERedux\u003C/li\u003E\u003Cli\u003EWebpack\u003C/li\u003E\u003Cli\u003EHTML 5\u003C/li\u003E\u003Cli\u003EResponsive CSS\u003C/li\u003E\u003C/ul\u003E",
      "image": "reactredux_spotify.jpg",
      "url": [
        {
          "link": "http://reactredux.deluxeluxury.com/",
          "text": "View Live Sites"
        },
        {
          "link": "https://github.com/SuperFastCola/tt-music-search/tree/master/app",
          "text": "View Essential Code"
        },
        {
          "link": "https://github.com/SuperFastCola/tt-music-search/blob/master/app/sass/styles.scss",
          "text": "View Essential SASS"
        }
      ],
      "projid": "reactredux",
      "type": [
        "design",
        "front-end"
      ]
    };

    const {getByText, getByTestId, container} = render( <Provider store={store}><ProjectDetailsDisplay details={projectTest} />
      </Provider>)

      const elem = await getByTestId('project-role');      
      expect(elem.innerHTML).toContain("Web Design");
  });
});
