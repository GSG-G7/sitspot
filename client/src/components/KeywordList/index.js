import React from 'react';
import { Icon } from 'antd';
import propTypes from 'prop-types';

import keywordObj from '../../staticDataSet/keywords';
import Button from '../Button';

import './index.css';

class KeywordList extends React.Component {
  state = {
    keywordsObj: keywordObj,
  };

  // componentDidMount() {
  //   reqKywords().then(({ data }) => {
  //     this.setState({ keywordsObj: data });
  //   });
  // }

  render() {
    const { keywords, toggleSelectKeyword, toggleKeywordList } = this.props;
    const { keywordsObj } = this.state;

    return (
      <div className="keywords">
        <div className="keywords__close">
          <Icon type="close" onClick={toggleKeywordList} />
        </div>
        <h2 className="keywords__title">Keywords</h2>
        <div className="keywords__list">
          {Object.keys(keywordsObj).map(key => (
            <Button
              key={key}
              onClick={() => toggleSelectKeyword(key)}
              className={
                keywords.indexOf(key) !== -1
                  ? 'keywords__list--item active-btn'
                  : 'keywords__list--item'
              }
            >
              <img
                className="keywords__list--item__img"
                alt="keyword"
                src={keywordsObj[key].src}
              />
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

KeywordList.propTypes = {
  keywords: propTypes.arrayOf(propTypes.string).isRequired,
  toggleSelectKeyword: propTypes.func.isRequired,
  toggleKeywordList: propTypes.func.isRequired,
};

export default KeywordList;
