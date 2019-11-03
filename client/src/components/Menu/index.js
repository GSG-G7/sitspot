import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

import './index.css';

const routes = [
  { content: 'Add your recommendation', path: '/review' },
  { content: 'FAQ', path: '/faq' },
  { content: 'About us', path: '/about-us' },
  { content: 'Contact', path: '/contact' },
];

const Menu = ({ closeHandler }) => {
  return (
    <div className="menu">
      <ul className="menu__list">
        <li className="menu__list__item">
          <NavLink className="menu__list__link" to="/search">
            Search
          </NavLink>
          <Icon
            className="menu__list__close"
            type="close"
            onClick={closeHandler}
          />
        </li>
        {routes.map(({ content, path }) => (
          <li className="menu__list__item" key={path}>
            <NavLink className="menu__list__link" to={path}>
              {content}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

Menu.propTypes = {
  closeHandler: propTypes.func.isRequired,
};

export default Menu;
