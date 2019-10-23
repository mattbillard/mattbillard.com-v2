import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

export const TopBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>MattBillard.com</Navbar.Brand>
    </Navbar>
  );
}
