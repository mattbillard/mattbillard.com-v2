import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import { About, Contact, Home, Skills } from '../';
import { configureStore } from '../../redux';

import './app.css';

const store = configureStore();

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <h1>App</h1>
          <Link to='/home'>home </Link> 
          <Link to='/about'>about </Link> 
          <Link to='/skills'>skills </Link> 
          <Link to='/contact'>contact </Link> 

          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/skills' component={Skills}/>
            <Route path='/contact' component={Contact}/>
            <Redirect from="/*" to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
