import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { About, BottomBar, Contact, Home, Skills, TopBar } from '../';
import * as config from '../../../config';
import { configureStore } from '../../redux';

import './inner-content.css';
import 'antd-mobile/dist/antd-mobile.css'; 

const store = configureStore();
const { pages } = config;

export const InnerContent: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <div className="inner-content flex-rows">
          <TopBar />

          <div className="content-area flex-grow-1">
            <Switch>
              <Route path={pages.home.innerUri} component={Home}/>
              <Route path={pages.about.innerUri} component={About}/>
              <Route path={pages.skills.innerUri} component={Skills}/>
              <Route path={pages.contact.innerUri} component={Contact}/>
              <Redirect from="/inner/*" to="/inner/home" /> 
            </Switch>
          </div>

          <BottomBar />
        </div>

      </BrowserRouter> 
    </Provider>
  );
}
