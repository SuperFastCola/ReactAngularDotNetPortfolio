import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import renderer from 'react-test-renderer';
import store from '../redux/store';
import { Project } from './Project';

describe('Initial Test', () => {
    it('renders project', () => {
        const {debug} = render(
            <Provider store={store}>
                <Router>
                <Routes>
                    <Route path="/" element={<Project/>} />
                </Routes>
                </Router>
            </Provider>,
        );
        debug();

    });

    
    
});
