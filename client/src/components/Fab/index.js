import React from 'react';
import propTypes from 'prop-types';

import Button from '../Button';

import './style.css';

const Fab = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="circle-main-color-button floating plus-text"
  >
    <span>+</span>
  </Button>
);

Fab.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Fab;
