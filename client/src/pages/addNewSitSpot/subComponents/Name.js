import React, { Component } from 'react';
import propTypes from 'prop-types';

import nameImg from '../../../assets/question-1.png';
import './index.css';

class Name extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ name: values.name });
  }

  handleChangeInput = value => {
    this.setState({ name: value });
    const { handelChange } = this.props;
    handelChange(value, 'name');
  };

  render() {
    const { name } = this.state;
    return (
      <div className="name">
        <h2 className="title name__title">What is the name of the business?</h2>
        <div className="name__img-box">
          <img className="img-box--img" src={nameImg} alt="sitspot img" />
        </div>
        <input
          className="input name__input"
          type="text"
          placeholder="Type your answer here"
          value={name}
          onChange={event => this.handleChangeInput(event.target.value)}
        />
      </div>
    );
  }
}

Name.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handelChange: propTypes.func.isRequired,
};

export default Name;
