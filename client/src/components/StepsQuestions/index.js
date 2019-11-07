import React from 'react';
import propTypes from 'prop-types';
import { Steps, Button, message, Select, Radio } from 'antd';
import { getCountryNames, getCities } from 'full-countries-cities';

import UploadImg from './UploadImg';

import './index.css';

const { Step } = Steps;

const handleChangeInput = (value, nameState, cb) => {
  cb(value, nameState);
};

const renderInput = (values, current, funcs) => {
  const stateKey = current === 0 ? 'name' : 'linkSite';
  return (
    <input
      className="input "
      type="text"
      placeholder={current === 0 ? 'Type your answer here' : 'http://'}
      value={current === 0 ? values.name : values.linkSite}
      onChange={event =>
        handleChangeInput(event.target.value, stateKey, funcs.handelChange)
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

const renderSelect = (values, current, funcs) => {
  const stateKey = current === 2 ? 'country' : 'city';
  let cities;
  if (current === 3) {
    cities = values.country ? getCities(values.country) : [];
  }
  return (
    <Select
      className="ant-select-country"
      showSearch
      placeholder="Select"
      optionFilterProp="children"
      value={current === 2 ? values.country : values.city}
      onChange={value => handleChangeInput(value, stateKey, funcs.handelChange)}
      filterOption={dropDownFilter}
    >
      {current === 2 ? renderOptions(getCountryNames()) : renderOptions(cities)}
    </Select>
  );
};

const renderRadio = (values, funcs) => {
  const BusinessTypes = Object.freeze({
    stay: 'place to stay',
    food: 'place to eat or drink',
    shop: 'place to shop',
  });

  return (
    <Radio.Group value={values.businessType} buttonStyle="solid">
      {Object.entries(BusinessTypes).map(([key, value]) => (
        <Radio.Button
          key={key}
          value={key}
          onClick={event =>
            handleChangeInput(
              event.target.value,
              'businessType',
              funcs.handelChange
            )
          }
        >
          {value}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

const renderQuestion = (questions, values, current, funcs, classes) => (
  <div className={classes[current]}>
    <h2 className={`title ${classes[current]}__title`}>
      {questions[current].title}
    </h2>
    {questions[current].imgUrl && (
      <div className="img__box">
        <img
          className="img__box--img"
          src={questions[current].imgUrl}
          alt="img question"
        />
      </div>
    )}
    {current < 2 && renderInput(values, current, funcs)}
    {current >= 2 &&
      current < 4 &&
      renderSelect(values, current, funcs, classes)}

    {current === 4 && renderRadio(values, funcs)}
    {current >= 5 &&
      (current <= 6 && (
        <UploadImg
          values={values}
          current={current}
          handelChange={funcs.handelChange}
        />
      ))}
  </div>
);

const renderButton = (text, func, type) => (
  <Button
    className={`steps__btn steps__btn--${
      text === 'Previouis' ? 'left' : 'right'
    }`}
    type={type || ''}
    onClick={() =>
      typeof func !== 'string'
        ? func()
        : message.success('Processing complete!')
    }
  >
    {text}
  </Button>
);

const StepsQuestions = ({ questions, current, values, funcs, classes }) => (
  <div className="steps">
    <Steps current={current}>
      {questions.map(({ id }) => (
        <Step key={id} />
      ))}
    </Steps>
    <div className="steps-content">
      {renderQuestion(questions, values, current, funcs, classes)}
    </div>
    <div className="steps-action">
      {current < questions.length - 1 &&
        renderButton('Next', funcs.next, 'primary')}

      {current === questions.length - 1 &&
        renderButton('Done', 'message', 'primary')}

      {current > 0 && renderButton('Previouis', funcs.prev)}
    </div>
  </div>
);

StepsQuestions.propTypes = {
  current: propTypes.number.isRequired,
  classes: propTypes.arrayOf(propTypes.string),
  questions: propTypes.arrayOf(propTypes.any).isRequired,
  funcs: propTypes.shape({
    next: propTypes.func.isRequired,
    prev: propTypes.func.isRequired,
    handelChange: propTypes.func.isRequired,
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
