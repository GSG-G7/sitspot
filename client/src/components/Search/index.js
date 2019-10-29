/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Select, Radio, Button } from 'antd';
import world from 'full-countries-cities';
import 'antd/dist/antd.css';

import Keywords from '../Keywords';

import './style.css';

const { Option } = Select;

class Search extends Component {
  state = {
    sitspot: '',
    country: '',
    city: '',
    lookingFor: '',
    keyword: '',
    viewKeywords: false,
  };

  renderOptions = list => {
    const countres = list.map(item => (
      <Option key={item} value={item}>
        {item}
      </Option>
    ));
    return countres;
  };

  onSubmit = () => {};

  setKeyword = value => this.setState({ keyword: value, viewKeywords: false });

  hideKeyword = () =>
    this.setState(({ viewKeywords }) => ({ viewKeywords: !viewKeywords }));

  render() {
    const { sitspot, country, city, keyword, viewKeywords } = this.state;
    const { sitspots } = this.props;

    return (
      <form className="search__form">
        <div className="place-name">
          <p>Place Name</p>
          <AutoComplete
            onChange={value => this.setState({ sitspot: value })}
            value={sitspot}
            dataSource={sitspots}
            placeholder="Place Name"
            filterOption={(inputValue, option) => {
              return (
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              );
            }}
          />
        </div>

        <div className="country-city-container">
          <div className="autocomplete-box">
            <div>Which Country?</div>
            <Select
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              onChange={value => this.setState({ country: value, city: '' })}
              value={country}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.renderOptions(world.getCountryNames())}
            </Select>
          </div>
          <div className="autocomplete-box">
            <div>WHICH City?</div>
            <Select
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              onChange={value => {
                this.setState({ city: value });
              }}
              value={city}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {country &&
                world.getCities(country) !== undefined &&
                this.renderOptions(world.getCities(country))}
            </Select>
          </div>
        </div>

        <div className="type-filter__container">
          <Radio.Group className="radio-group" buttonStyle="solid">
            <p className="button-label">What Are You Looking For</p>
            <Radio.Button
              className="radio-button"
              value="Stay"
              onClick={() => this.setState({ lookingFor: 'stay' })}
            >
              Stay
            </Radio.Button>
            <Radio.Button
              className="radio-button"
              value="eat"
              onClick={() => this.setState({ lookingFor: 'eat' })}
            >
              Eat & drink
            </Radio.Button>
            <Radio.Button
              className="radio-button"
              value="shop"
              onClick={() => this.setState({ lookingFor: 'shop' })}
            >
              Shop
            </Radio.Button>
          </Radio.Group>
          <div className="type-filter__container__filter">
            <p className="button-label">Filter</p>
            <Button
              onClick={() => {
                // eslint-disable-next-line no-unused-vars
                this.setState(_state => ({
                  viewKeywords: !viewKeywords,
                }));
              }}
            >
              {keyword || 'Keywords'}
            </Button>
          </div>
        </div>
        <div className="form-action">
          <Button className="search-btn" onClick={() => this.onSubmit()}>
            Search
          </Button>
          <Button className="recommendation-btn" onClick={() => {}}>
            + Add your recommendation
          </Button>
        </div>
        {viewKeywords ? (
          <Keywords
            keyword={keyword}
            setKeyword={this.setKeyword}
            hideKeyword={this.hideKeyword}
          />
        ) : (
          ''
        )}
      </form>
    );
  }
}

Search.propTypes = {
  sitspots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Search;
