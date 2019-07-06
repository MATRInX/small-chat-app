import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { roomReducer } from '../reducers/socketIO/room';
import { userReducer } from '../reducers/socketIO/user';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const enhancers = composeWithDevTools( window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()();

const rootReducer = combineReducers({
  rooms: roomReducer,
  joinedUsers: userReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default () => {
  return store;
}

export type AppState = ReturnType<typeof rootReducer>