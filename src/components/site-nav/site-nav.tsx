import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import * as config from '../../config';
import './site-nav.scss';

const { pages, siteTitle, Themes } = config;

export const SiteNav: React.FC = () => {
  return (
    <div className="site-nav">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={pages.home.uri}>{siteTitle}</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown title="Themes" id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href={`#${Themes.Red}`}>Red Theme</NavDropdown.Item>
              <NavDropdown.Item href={`#${Themes.WhatsApp}`}>What's App Theme</NavDropdown.Item>
              <NavDropdown.Item href={`#${Themes.Retro}`}>Retro Theme</NavDropdown.Item>
              <NavDropdown.Item href={`#${Themes.Blue}`}>Blue Theme</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
