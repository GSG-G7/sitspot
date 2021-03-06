import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

import './index.css';

const routes = [
  { content: 'Search', path: '/search' },
  { content: 'Add your recommendation', path: '/add-place' },
  { content: 'FAQ', path: '/faq' },
  { content: 'About us', path: '/about-us' },
];

const Menu = ({ closeHandler }) => (
  <div className="menu">
    <ul className="menu__list">
      <li className="menu__list__item">
        <NavLink
          className="menu__list__link"
          to="/Home"
          onClick={closeHandler}
          style={{ width: '100%' }}
        >
          Home
        </NavLink>
        <Icon
          className="menu__list__close"
          type="close"
          onClick={closeHandler}
        />
      </li>
      {routes.map(({ content, path }) => (
        <NavLink
          className="menu__list__item"
          to={path}
          onClick={closeHandler}
          key={path}
        >
          <li className="menu__list__link menu__list__item">{content}</li>
        </NavLink>
      ))}
    </ul>
  </div>
);

Menu.propTypes = {
  closeHandler: propTypes.func.isRequired,
};

export default Menu;
