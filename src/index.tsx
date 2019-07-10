import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import io from 'socket.io-client';
import { createNewRoom } from './redux/actions/socketIO/room';
import ChatApp from './components/ChatApp/ChatApp';

export const socket = io();
const store = configureStore();

store.dispatch(createNewRoom('jeden', true, false));
store.dispatch(createNewRoom('dwa', true, false));
store.dispatch(createNewRoom('trzy', true, false));

const tsx: JSX.Element = (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);