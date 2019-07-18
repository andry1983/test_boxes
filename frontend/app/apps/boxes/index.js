import React from 'react';
import ReactDom from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import RoutingBox from './routes';
import './style/index.scss';

const store = configureStore();

ReactDom.render(
    <Provider key={Math.random()} store={store}>
        <Router>
            {RoutingBox}
        </Router>
    </Provider>,
    document.getElementById('apps')
);
