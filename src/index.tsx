import React from 'react';
import ReactDOM from 'react-dom';

const tsx: JSX.Element = (
  <div>
    Hello world!
  </div>
);

const element = document.getElementById('app');

ReactDOM.render(tsx, element);