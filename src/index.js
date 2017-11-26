import React        from 'react';
import ReactDOM     from 'react-dom';
import {Provider}   from 'react-redux'
import './css/index.css';
import App                   from './App';
import configure_store       from './redux/store/configure_store';
import registerServiceWorker from './registerServiceWorker';

const store = configure_store({})
console.log('store',store)
ReactDOM.render(
     <Provider store={store}>
      <App />
     </Provider>,
     document.getElementById('root')
    );

registerServiceWorker();
