import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


let isProduction = process.env.NODE_ENV === 'production' || process.env.ENV === 'production';

function _applyMiddleware() {
    const middleware = [thunk];
    return applyMiddleware(...middleware);
}

export default function configureStore(initialState) {
    let store = null;
    if (!isProduction)
        store = compose(composeWithDevTools(applyMiddleware(_applyMiddleware)))(createStore)(rootReducer, initialState);
    else
        store = compose(applyMiddleware(_applyMiddleware))(createStore)(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default();
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
