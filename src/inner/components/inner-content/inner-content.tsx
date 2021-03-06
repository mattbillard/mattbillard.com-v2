import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { About, BottomBar, Contact, ErrorBoundary, Home, Skills, TopBar } from '../';
import * as config from '../../../config';
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

export const InnerContent: React.FC = () => {
  const theme = window.location.hash.replace('#', '') || config.Themes.Default;

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>

          <div className={`inner-content flex-rows ${theme}`} key={theme}>
            <TopBar />

            <div className="content-area flex-grow-1">
              <Switch>
                <Route path={pages.home.innerUri} component={Home} />
                <Route path={pages.about.innerUri} component={About} />
                <Route path={pages.skills.innerUri} component={Skills} />
                <Route path={pages.contact.innerUri} component={Contact} />
                <Redirect from="/inner/*" to="/inner/home" />
              </Switch>
            </div>

            <BottomBar />
          </div>

        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}
