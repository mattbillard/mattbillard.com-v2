import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import { About, BottomBar, Contact, Home, Skills, TopBar } from '../';
import { configureStore } from '../../redux';

import './inner-content.css';
import 'antd-mobile/dist/antd-mobile.css'; 

const store = configureStore();

export const InnerContent: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="inner-content">
          <TopBar />

          <h1>InnerContent</h1>
          <Link to='/inner/home'>home </Link> 
          <Link to='/inner/about'>about </Link> 
          <Link to='/inner/skills'>skills </Link> 
          <Link to='/inner/contact'>contact </Link> 

          <div style={{padding: '10px'}}>
            <Switch>
              <Route path='/inner/home' component={Home}/>
              <Route path='/inner/about' component={About}/>
              <Route path='/inner/skills' component={Skills}/>
              <Route path='/inner/contact' component={Contact}/>
              <Redirect from="/inner/*" to="/inner/home" /> 
            </Switch>
          </div>

          {/* <BottomBar /> */}
        </div>
      </BrowserRouter> 
    </Provider>
  );
}
