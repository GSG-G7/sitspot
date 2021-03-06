import React from 'react';
import propTypes from 'prop-types';
// https://www.npmjs.com/package/react-typeform-embed
import { ReactTypeformEmbed } from 'react-typeform-embed';

import { Button } from '../../components';
import urls from './urls';

import './style.css';

class AddReview extends React.Component {
  typeformEmbed = null;

  componentWillUnmount() {
    this.closeForm();
  }

  openForm = () => this.typeformEmbed.typeform.open();

  closeForm = () => this.typeformEmbed.typeform.close();

  render() {
    const { type, sitspotId, history } = this.props;
    return (
      <>
        <div className="header-img header-container" />
        <div className="add-new-review-container">
          <h1 className="add-new-review__title">
            We will now ask you to follow these steps to complete your
            recommendation:
          </h1>
          <ol>
            <li>
              1) Fill in your contributor profile - only if you haven&apos;t
              already done so.
            </li>
            <li>2) Provide some basic info about your sitspot.</li>
            <li>3) Tick the sustainability credentials you observed</li>
            <li>4) and the &quot;magical factors&quot; you liked</li>
            <li>5) and write a brief overall review.</li>
          </ol>
          <p className="add-new-review__p">
            Here are some basic principles:
            <br />- be personal <br />- be honest <br />- be helpful <br />- if
            you&apos;re not sure about a specified criteria, just skip it.{' '}
            <br />
            Fields with * are mandatory, and if you want go back to a previous
            question, scroll up or click on the green arrows bottom right of
            your screen. Sharing is caring so warm thanks in advance!
          </p>
          <Button
            type="button"
            className="add-new-review__btn"
            onClick={this.openForm}
            style={{ cursor: 'pointer' }}
          >
            click to start your recommendation!
          </Button>
        </div>
        <ReactTypeformEmbed
          ref={tf => {
            this.typeformEmbed = tf;
          }}
          url={urls[type](sitspotId)}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: '2',
          }}
          popup
          onSubmit={() => history.push(`/sitspot/${sitspotId}`)}
        />
      </>
    );
  }
}
AddReview.propTypes = {
  type: propTypes.oneOf(['STAY', 'EAT', 'SHOP']).isRequired,
  sitspotId: propTypes.string.isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default AddReview;
