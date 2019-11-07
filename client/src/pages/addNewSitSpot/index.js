import React, { Component } from 'react';
import { StepsQuestions } from '../../components';

import Questions from './fakeData';

import './index.css';

const Classes = [
  'name',
  'website',
  'country',
  'city',
  'type',
  'upload-img',
  'upload-img',
];

class AddNewSitSpot extends Component {
  state = {
    data: {
      name: '',
      linkSite: '',
      country: '',
      city: '',
      businessType: '',
      imgUrlOne: null,
      imgUrlTwo: null,
    },
    current: 0,
  };

  handelChange = (value, dataKey) => {
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, [dataKey]: value },
    }));
  };

  next = () => {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  };

  render() {
    const { current, data } = this.state;
    return (
      <div id="add-place" className="add-place">
        <div className="add-place__header"> </div>
        <div className="add-place__wrapper">
          <StepsQuestions
            classes={Classes}
            values={data}
            questions={Questions}
            current={current}
            funcs={{
              next: this.next,
              prev: this.prev,
              handelChange: this.handelChange,
            }}
          />
        </div>
      </div>
    );
  }
}

export default AddNewSitSpot;
