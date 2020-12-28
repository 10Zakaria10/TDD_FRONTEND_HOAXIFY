import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import UserPage from '../Pages/UserPage';
import UserSignUpPage from '../Pages/UserSignUpPage';
import Reservation from './TestFormik'


function App() { 
  return (
    <div>
      <Switch>
        {/* homePage hna */}
      <Route exact path='/' component={Reservation} />
      <Route path='/login' component={LoginPage}/>
      <Route path='/signup' component={UserSignUpPage}/>
      <Route path='/:username' component={UserPage}/>
      </Switch>
    </div>
  );
}

export default App;
