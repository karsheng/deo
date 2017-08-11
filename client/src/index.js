import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './app';
import { AUTH_USER, FETCH_USER_INFO, OPEN_SNACKBAR } from './actions/types';
import { ROOT_URL } from './constants';
import axios from 'axios';
import'../style/style.css';
import'../style/bootstrap.min.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('deotoken');

if (token) {
  let config = {
    headers: { authorization: token }
  };
  axios.get(
    `${ROOT_URL}/api/profile`, 
    config
  )
  .then(response => {
    store.dispatch({
      type: FETCH_USER_INFO,
      payload: response.data
    });
    store.dispatch({ type: AUTH_USER });
    store.dispatch({ 
      type: OPEN_SNACKBAR,
      payload: `Signed in as ${response.data.email}` 
    });
  })
  .catch(err => {
    console.log(err);
    localStorage.removeItem('deotoken');
  });

}

ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>
      <MuiThemeProvider>
  		  <App />
      </MuiThemeProvider>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
