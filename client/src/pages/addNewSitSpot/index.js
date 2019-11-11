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
    currentStep: 0,
  };

  handleChange = (value, dataKey) => {
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, [dataKey]: value },
    }));
  };

  next = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1 });
  };

  prev = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep - 1 });
  };

  render() {
    const { currentStep, data } = this.state;
    return (
      <div id="add-place" className="add-place">
        <div className="add-place__header"> </div>
        <div className="add-place__wrapper">
          <StepsQuestions
            classes={Classes}
            values={data}
            questions={Questions}
            currentStep={currentStep}
            funcs={{
              next: this.next,
              prev: this.prev,
              handleChange: this.handleChange,
            }}
          />
        </div>
      </div>
    );
  }
}

export default AddNewSitSpot;
