import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { InnerContent } from '../inner/components';
import { OuterContent } from '../outer/components';

import './app.css';
import 'antd-mobile/dist/antd-mobile.css'; 

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">

        <Switch>
          <Route path='/inner' component={InnerContent}/>
          <Route path='/*' component={OuterContent}/>
        </Switch>

      </div>
    </BrowserRouter> 
  );
}
