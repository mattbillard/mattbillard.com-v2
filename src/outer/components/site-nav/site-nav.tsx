import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import * as config from '../../../config';
import './site-nav.scss';

export const SiteNav: React.FC = () => {
  return (
    <div className="site-nav">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={config.pages.home.outerUri}>{config.siteTitle}</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown title="Themes" id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="#mainTheme">Main Theme</NavDropdown.Item>
              <NavDropdown.Item href="#whatsAppTheme">What's App Theme</NavDropdown.Item>
              <NavDropdown.Item href="#retroTheme">Retro Theme</NavDropdown.Item>
              <NavDropdown.Item href="#redTheme">Red Theme</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
