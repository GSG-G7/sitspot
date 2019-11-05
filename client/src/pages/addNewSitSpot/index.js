import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';

import subComponents from './subComponents';

import './index.css';

const { Step } = Steps;

const steps = ['Name', 'Website', 'Country', 'City', 'BusinessType'];

class AddNewSitSpot extends Component {
  state = {
    data: {
      name: '',
      linkSite: '',
      country: '',
      city: '',
      businessType: '',
    },
    current: 0,
  };

  handelChange = (value, dataKey) => {
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, [dataKey]: value },
    }));
  };

  next() {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  }

  prev() {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  }

  renderButton = () => <div>afd</div>;

  render() {
    const { current, data } = this.state;
    const CurrentQuestion = subComponents[steps[current]];
    return (
      <div id="add-place" className="add-place">
        <div className="add-place__header"> </div>
        <div className="add-place__container">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item} />
            ))}
          </Steps>

          <div className="steps-content">
            <CurrentQuestion values={data} handelChange={this.handelChange} />
          </div>

          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button
                className="steps__btn"
                type="primary"
                onClick={() => {
                  this.next();
                }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="steps__btn"
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                className="steps__btn"
                onClick={() => {
                  this.prev();
                }}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddNewSitSpot;
