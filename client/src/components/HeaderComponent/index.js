import React, { Component } from 'react';

import logo from '../../assets/images/logo.svg';
import './style.css';

export default class Header extends Component {
  state = {
    menuIsShown: false,
  };

  onClickHandler = () => {
    return this.setState(prevState => ({
      menuIsShown: !prevState.menuIsShown,
    }));
  };

  render() {
    const { menuIsShown } = this.state;
    if (menuIsShown) {
      return (
        <div>
          <header>
            <img alt="logo" src={logo} />
            <button
              className="burger"
              type="button"
              onClick={this.onClickHandler}
            >
              <div className="burger_div" />
              <div className="burger_div" />
              <div className="burger_div" />
            </button>
          </header>
          <p>Hello</p>
        </div>
      );
    }

    return (
      <div>
        <header>
          <img alt="logo" src={logo} />
          <button
            className="burger"
            type="button"
            onClick={this.onClickHandler}
          >
            <div className="burger_div" />
            <div className="burger_div" />
            <div className="burger_div" />
          </button>
        </header>
      </div>
    );
  }
}
