import React from 'react';
import { About, Contact, Home, Skills } from '../';
import './app.css';

export const App: React.FC = () => {
  return (
    <div className="App">
      App
      <Home />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}
