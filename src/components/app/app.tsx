import React from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DraggablePhone, SiteNav } from '../';
// import { configureStore } from '../../redux';

// const store = configureStore();

export const App: React.FC = () => {
  return (
    // <Provider store={store}>
    //   <BrowserRouter>

    <div className="app">
      <SiteNav />
      <DraggablePhone />
    </div>

    //   </BrowserRouter>
    // </Provider>
  );
}
