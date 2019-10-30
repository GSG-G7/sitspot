import React from 'react';
import { Icon } from 'antd';
import propTypes from 'prop-types';

import keywords from '../../staticDataSet/keywords';
import Button from '../Button';

import './index.css';

const Keywords = ({ keyword, setKeyword, hideKeyword }) => (
  <div className="keywords">
    <div className="keywords__close">
      <Icon type="close" onClick={hideKeyword} />
    </div>
    <h2 className="keywords__title">Keywords</h2>
    <div className="keywords__list">
      {Object.keys(keywords).map(key => {
        return (
          <Button
            key={key}
            onClick={() => setKeyword(key)}
            className={
              key === keyword
                ? 'keywords__list--item active-btn'
                : 'keywords__list--item'
            }
          >
            {keywords[key].text}
          </Button>
        );
      })}
    </div>
  </div>
);

Keywords.propTypes = {
  keyword: propTypes.string.isRequired,
  setKeyword: propTypes.func.isRequired,
  hideKeyword: propTypes.func.isRequired,
};

export default Keywords;
