import React, { Component } from 'react';
import propTypes from 'prop-types';

import './index.css';

class Website extends Component {
  state = {
    siteUrl: '',
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ siteUrl: values.linkSite });
  }

  handleChangeInput = value => {
    this.setState({ siteUrl: value });
    const { handelChange } = this.props;
    handelChange(value, 'linkSite');
  };

  render() {
    const { siteUrl } = this.state;
    return (
      <div className="website">
        <h2 className="title website__title">
          If it’s easy enough for you, please indicate their website address .
          This will help us ensure we list the correct establishment.
        </h2>
        <input
          className="input website__input"
          type="text"
          placeholder="Type your answer here"
          value={siteUrl}
          onChange={event => this.handleChangeInput(event.target.value)}
        />
      </div>
    );
  }
}

Website.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handelChange: propTypes.func.isRequired,
};

export default Website;
