import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Select, Radio, Button as AntButton, Icon } from 'antd';
import { getCities } from 'full-countries-cities';
import { count } from '../../services/api';
import Button from '../Button';

import KeywordList from '../KeywordList';

import './style.css';

const { Option } = Select;

class Search extends Component {
  state = {
    country: undefined,
    city: undefined,
    lookingFor: '',
    keywords: [],
    viewKeywords: false,
  };

  countries = { place: 'holder' };

  LookingFor = Object.freeze({
    STAY: 'Stay',
    EAT: 'Eat & Drink',
    SHOP: 'Shop',
  });

  componentDidMount() {
    count()
      .then(({ data }) => {
        this.countries = data;
      })
      .then(() => this.forceUpdate());
    const { searchState } = this.props;
    if (searchState) this.setState({ ...searchState });
  }

  renderOptions = list =>
    list.map(item => (
      <Option key={item} value={item}>
        {item}
      </Option>
    ));

  renderCountries = () =>
    Object.entries(this.countries).map(([k, v]) => (
      <Option key={k} value={k}>
        {k} ({v})
      </Option>
    ));

  toggleKeywordList = () =>
    this.setState(state => ({ viewKeywords: !state.viewKeywords }));

  toggleSelectKeyword = keyword => {
    const {
      keywords: [...keywords],
    } = this.state;

    const index = keywords.indexOf(keyword);

    if (index < 0) {
      keywords.push(keyword);
      this.setState({ keywords });
    } else {
      keywords.splice(index, 1);
      this.setState({ keywords });
    }
  };

  dropDownFilter = (input, option) =>
    option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;

  handleRadioButton = e => this.setState({ lookingFor: e.target.value });

  render() {
    const { country, city, keywords, viewKeywords, lookingFor } = this.state;
    const { fontColor, onSubmit } = this.props;
    const cities = country ? getCities(country) : [];
    return (
      <form className="search__form" style={{ color: fontColor }}>
        <div className="country-city-container">
          <div className="autocomplete-box">
            <div>WHICH COUNTRY?</div>
            <Select
              className="ant-select-country"
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              value={country}
              onChange={value => this.setState({ country: value, city: '' })}
              filterOption={this.dropDownFilter}
            >
              {this.renderCountries()}
            </Select>
          </div>
          <div className="autocomplete-box">
            <div>WHICH CITY?</div>
            <Select
              id="ant-select-city"
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              value={city}
              onChange={value => this.setState({ city: value })}
              filterOption={this.dropDownFilter}
            >
              {cities && this.renderOptions(cities)}
            </Select>
          </div>
        </div>

        <div className="type-filter__container">
          <Radio.Group
            className="radio-group"
            value={lookingFor}
            buttonStyle="solid"
          >
            <p style={{ color: fontColor }} className="button-label">
              WHAT ARE YOU LOOKING FOR?
            </p>
            {Object.entries(this.LookingFor).map(([key, value]) => (
              <Radio.Button
                className="radio-button"
                key={key}
                value={key.toLowerCase()}
                onClick={this.handleRadioButton}
              >
                {value}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div className="type-filter__container__filter">
            <p className="button-label">FILTER</p>
            <AntButton id="keywords-btn" onClick={this.toggleKeywordList}>
              Keywords
            </AntButton>
          </div>
        </div>
        <div className="form-action">
          <AntButton id="search-btn" onClick={() => onSubmit(this.state)}>
            Search
          </AntButton>
          <Link to="/add-place">
            <Button
              className="button  primary-background"
              style={{ opacity: '.80' }}
            >
              <Icon id="plus-svg" type="plus" style={{ color: '#fff' }} />
              <span className="button-text"> Add your recommendation</span>
            </Button>
          </Link>
        </div>
        {viewKeywords && (
          <KeywordList
            keywords={keywords}
            toggleSelectKeyword={this.toggleSelectKeyword}
            toggleKeywordList={this.toggleKeywordList}
          />
        )}
      </form>
    );
  }
}
Search.defaultProps = {
  fontColor: '#fff',
  searchState: {},
};

Search.propTypes = {
  fontColor: PropTypes.string,
  searchState: PropTypes.shape({
    country: PropTypes.string,
    city: PropTypes.string,
    lookingFor: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    viewKeywords: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
