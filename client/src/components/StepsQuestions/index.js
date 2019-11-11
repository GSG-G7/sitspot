import React from 'react';
import propTypes from 'prop-types';
import { Steps, Button, message, Select, Radio } from 'antd';
import { getCountryNames, getCities } from 'full-countries-cities';

import UploadImg from './UploadImg';

import './index.css';

const { Step } = Steps;

const BusinessTypes = Object.freeze({
  stay: 'place to stay',
  eat: 'place to eat or drink',
  shop: 'place to shop',
});

const handleChangeInput = (value, nameState, cb) => {
  cb(value, nameState);
};

const renderInput = (values, currentStep, funcs) => {
  const stateKey = currentStep === 0 ? 'name' : 'linkSite';
  return (
    <input
      className="input "
      type="text"
      placeholder={currentStep === 0 ? 'Type your answer here' : 'http://'}
      value={currentStep === 0 ? values.name : values.linkSite}
      onChange={event =>
        handleChangeInput(event.target.value, stateKey, funcs.handleChange)
      }
    />
  );
};

const renderOptions = list => {
  const { Option } = Select;

  return list.map(item => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ));
};

const dropDownFilter = (input, option) =>
  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

const renderSelect = (values, currentStep, funcs) => {
  const stateKey = currentStep === 2 ? 'country' : 'city';
  let cities;
  if (currentStep === 3) {
    cities = values.country ? getCities(values.country) : [];
  }
  return (
    <Select
      className="ant-select-country"
      showSearch
      placeholder="Select"
      optionFilterProp="children"
      value={currentStep === 2 ? values.country : values.city}
      onChange={value => handleChangeInput(value, stateKey, funcs.handleChange)}
      filterOption={dropDownFilter}
    >
      {currentStep === 2
        ? renderOptions(getCountryNames())
        : renderOptions(cities)}
    </Select>
  );
};

const renderRadio = (values, funcs) => (
  <Radio.Group value={values.businessType} buttonStyle="solid">
    {Object.entries(BusinessTypes).map(([key, value]) => (
      <Radio.Button
        key={key}
        value={key}
        onClick={event =>
          handleChangeInput(
            event.target.value,
            'businessType',
            funcs.handleChange
          )
        }
      >
        {value}
      </Radio.Button>
    ))}
  </Radio.Group>
);

const renderQuestion = (questions, values, currentStep, funcs, classes) => (
  <div className={classes[currentStep]}>
    <h2 className={`title ${classes[currentStep]}__title`}>
      {questions[currentStep].title}
    </h2>
    {questions[currentStep].imgUrl && (
      <div className="img__box">
        <img
          className="img__box--img"
          src={questions[currentStep].imgUrl}
          alt="img question"
        />
      </div>
    )}
    {currentStep < 2 && renderInput(values, currentStep, funcs)}
    {currentStep >= 2 &&
      currentStep < 4 &&
      renderSelect(values, currentStep, funcs, classes)}

    {currentStep === 4 && renderRadio(values, funcs)}
    {currentStep >= 5 && currentStep <= 6 && (
      <UploadImg
        values={values}
        currentStep={currentStep}
        handleChange={funcs.handleChange}
      />
    )}
  </div>
);

const ButtonInfo = Object.freeze({
  NEXT: 'Next',
  PREVIOUS: 'Previous',
  DONE: 'Done',
  TYPE: 'primary',
  MESSAGE: 'Processing complete!',
});

const renderButton = (text, func, type, isPrevious) => (
  <Button
    className={`steps__btn steps__btn--${isPrevious ? 'left' : 'right'}`}
    type={type || ''}
    onClick={() => (func ? func() : message.success(ButtonInfo.MESSAGE))}
  >
    {text}
  </Button>
);

const StepsQuestions = ({ questions, currentStep, values, funcs, classes }) => (
  <div className="steps">
    <Steps current={currentStep}>
      {questions.map(({ id }) => (
        <Step key={id} />
      ))}
    </Steps>
    <div className="steps-content">
      {renderQuestion(questions, values, currentStep, funcs, classes)}
    </div>
    <div className="steps-action">
      {currentStep < questions.length - 1 &&
        renderButton(ButtonInfo.NEXT, funcs.next, ButtonInfo.TYPE)}

      {currentStep === questions.length - 1 &&
        renderButton(ButtonInfo.DONE, funcs.onSubmit, ButtonInfo.TYPE)}
      {/* {currentStep === questions.length - 1 &&
        renderButton(ButtonInfo.DONE, null, ButtonInfo.TYPE)} */}

      {currentStep > 0 &&
        renderButton(ButtonInfo.PREVIOUS, funcs.prev, null, true)}
    </div>
  </div>
);

StepsQuestions.propTypes = {
  currentStep: propTypes.number.isRequired,
  classes: propTypes.arrayOf(propTypes.string),
  questions: propTypes.arrayOf(propTypes.any).isRequired,
  funcs: propTypes.shape({
    next: propTypes.func.isRequired,
    prev: propTypes.func.isRequired,
    handleChange: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
  }).isRequired,
  values: propTypes.shape({
    name: propTypes.string.isRequired,
    linkSite: propTypes.string.isRequired,
    country: propTypes.string.isRequired,
    city: propTypes.string.isRequired,
    businessType: propTypes.string.isRequired,
    imgUrlOne: propTypes.string,
    imgUrlTwo: propTypes.string,
  }).isRequired,
};

StepsQuestions.defaultProps = {
  classes: '',
};

export default StepsQuestions;
