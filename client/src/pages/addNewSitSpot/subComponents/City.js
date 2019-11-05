import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';
import { getCities } from 'full-countries-cities';

import './index.css';

const { Option } = Select;

class City extends Component {
  state = {
    city: '',
  };

  componentDidMount() {
    const { values } = this.props;
    this.setState({ city: values.city });
  }

  handleChangeInput = value => {
    this.setState({ city: value });
    const { handelChange } = this.props;
    handelChange(value, 'city');
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
    const { city } = this.state;
    const {
      values: { country },
    } = this.props;
    const cities = country ? getCities(country) : [];
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
            value={city}
            onChange={value => this.handleChangeInput(value)}
            filterOption={this.dropDownFilter}
          >
            {cities && this.renderOptions(cities)}
          </Select>
        </div>
      </div>
    );
  }
}

City.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handelChange: propTypes.func.isRequired,
};

export default City;
