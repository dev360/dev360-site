import React from 'react';
import Avatar from './views/Avatar.js';
import Nav from './views/Nav.js';
import Logo from './views/Logo.js';


React.render(
  <Nav />,
  document.getElementById('container')
);

React.render(
  <Avatar />,
  document.getElementById('avatar')
);

React.render(
  <Logo />,
  document.getElementById('logo')
);
