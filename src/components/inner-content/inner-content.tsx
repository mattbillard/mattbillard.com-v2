import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { About, BottomBar, Contact, Home, Skills, TopBar } from '../';
import * as config from '../../config';
import { configureStore } from '../../redux';

import '../../styles/flexbox.scss';
import './inner-content.scss';

import '../../styles/theme-base.scss';
import '../../styles/theme-blue.scss';
import '../../styles/theme-red.scss';
import '../../styles/theme-retro.scss';
import '../../styles/theme-whatsapp.scss';

const store = configureStore();
const { pages } = config;

export interface IInnerConentState {
  theme: string;
}

export class InnerContent extends React.Component<{}, IInnerConentState> {
  state = {
    theme: ''
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.setTheme);
    this.setTheme();
  }

  setTheme = () => {
    const theme = window.location.hash.replace('#', '') || config.Themes.Default;
    this.setState({theme});
  }

  render() {
    const { theme } = this.state;
    
    return (
      <Provider store={store}>
        <BrowserRouter>
  
          <div className={`inner-content flex-rows ${theme}`} key={theme}>
            <TopBar />
  
            <div className="content-area flex-grow-1">
              <Switch>
                <Route path={pages.home.uri} component={Home}/>
                <Route path={pages.about.uri} component={About}/>
                <Route path={pages.skills.uri} component={Skills}/>
                <Route path={pages.contact.uri} component={Contact}/>
                <Redirect from="/inner/*" to="/inner/home" /> 
              </Switch>
            </div>
  
            <BottomBar />
          </div>
  
        </BrowserRouter> 
      </Provider>
    );
  }
}
