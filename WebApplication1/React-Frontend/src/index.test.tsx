import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

describe('Initial Test', () => {
    it('renders app', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>    
        );
        expect(screen.getByText('New Project')).toBeInTheDocument();
    });
});
