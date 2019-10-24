import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { About, BottomBar, Contact, Home, Skills, TopBar } from '../';
import { config } from '../../../config';
import { configureStore } from '../../redux';

import './inner-content.css';
import 'antd-mobile/dist/antd-mobile.css'; 

const store = configureStore();
const { uris } = config;

export const InnerContent: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <div className="inner-content flex-rows">
          <TopBar />

          <div className="content-area flex-grow-1">
            <Switch>
              <Route path={uris.home.page} component={Home}/>
              <Route path={uris.about.page} component={About}/>
              <Route path={uris.skills.page} component={Skills}/>
              <Route path={uris.contact.page} component={Contact}/>
              <Redirect from="/inner/*" to="/inner/home" /> 
            </Switch>
          </div>

          <BottomBar />
        </div>

      </BrowserRouter> 
    </Provider>
  );
}
