import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';
import { getCountryNames } from 'full-countries-cities';

import './index.css';

const { Option } = Select;

class Country extends Component {
  state = {
    country: '',
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ country: values.country });
  }

  handleChangeInput = value => {
    this.setState({ country: value });
    const { handelChange } = this.props;
    handelChange(value, 'country');
  };

  dropDownFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  renderOptions = list =>
    list.map(item => (
      <Option key={item} value={item}>
        {item}
      </Option>
    ));

  render() {
    const { country } = this.state;
    return (
      <div className="country">
        <h2 className="title country__title">
          In which country is this buisness located?
        </h2>
        <div className="autocomplete-box">
          <Select
            className="ant-select-country"
            showSearch
            placeholder="Select"
            optionFilterProp="children"
            value={country}
            onChange={value => this.handleChangeInput(value)}
            filterOption={this.dropDownFilter}
          >
            {this.renderOptions(getCountryNames())}
          </Select>
        </div>
      </div>
    );
  }
}

Country.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handelChange: propTypes.func.isRequired,
};

export default Country;
