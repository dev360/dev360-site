import React from 'react';

import Avatar from './views/Avatar.js';
import Logo from './views/Logo.js';
import Nav from './views/Nav.js';
import Scene from './views/Scene.js';

window.scene = Scene();


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
