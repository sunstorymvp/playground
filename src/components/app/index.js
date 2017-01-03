import React from 'react';

const getAsyncModule = () => {
  import('./async_module').then((module) => {
    module.default();
  }).catch((error) => {
    console.error('Module loading failed:', error);
  });
};

const App = () => (
  <h1 onClick={ getAsyncModule }>Hello world!</h1>
);

export default App;
