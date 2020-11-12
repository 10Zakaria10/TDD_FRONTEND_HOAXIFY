import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import {HashRouter} from 'react-router-dom';
import {UserSignUpPage} from './Pages/UserSignUpPage';
import * as serviceWorker from './serviceWorker';
import * as apiCalls from './api/ApiCalls';

const actions = {
  postSignUp : apiCalls.signUp
}
ReactDOM.render(
 <HashRouter>
   <App/>
 </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
