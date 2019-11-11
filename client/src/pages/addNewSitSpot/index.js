import React, { Component } from 'react';
import axios from 'axios';
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

  onSubmit = () => {
    const { data } = this.state;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    axios.post('/api/v1/add-place', formData, {
      headers: { 'content-type': 'multipart/formdata' },
    });
    // .then(result => console.log(result));
  };

  handleChange = (value, dataKey) => {
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, [dataKey]: value },
    }));
  };

  next = () =>
    this.setState(({ currentStep }) => ({
      currentStep: currentStep + 1,
    }));

  prev = () =>
    this.setState(({ currentStep }) => ({
      currentStep: currentStep - 1,
    }));

  render() {
    const { currentStep, data } = this.state;
    // console.log(this.state.data.imgUrlOne);
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
              onSubmit: this.onSubmit,
            }}
          />
        </div>
      </div>
    );
  }
}

export default AddNewSitSpot;
