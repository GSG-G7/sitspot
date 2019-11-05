import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Radio } from 'antd';

import './index.css';

class BusinessType extends Component {
  state = {
    businessType: '',
  };

  BusinessTypes = Object.freeze({
    stay: 'place to stay',
    food: 'place to eat or drink',
    shop: 'place to shop',
  });

  componentDidMount() {
    const { values } = this.props;
    this.setState({ businessType: values.businessType });
  }

  handleRadioButton = value => {
    this.setState({ businessType: value });
    const { handelChange } = this.props;
    handelChange(value, 'businessType');
  };

  render() {
    const { businessType } = this.state;
    return (
      <div className="type">
        <h2 className="title type__title">What type of business is it?</h2>

        <Radio.Group value={businessType} buttonStyle="solid">
          {Object.entries(this.BusinessTypes).map(([key, value]) => (
            <Radio.Button
              key={key}
              value={key}
              onClick={event => this.handleRadioButton(event.target.value)}
            >
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    );
  }
}

BusinessType.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handelChange: propTypes.func.isRequired,
};

export default BusinessType;
