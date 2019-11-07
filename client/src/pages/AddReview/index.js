import React from 'react';
import propTypes from 'prop-types';
// https://www.npmjs.com/package/react-typeform-embed
import { ReactTypeformEmbed } from 'react-typeform-embed';

import { Button } from '../../components';
import urls from './urls';

import './style.css';

const AddReview = ({ type, sitspotId }) => {
  let typeformEmbed = null;
  const openForm = () => typeformEmbed.typeform.open();
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
          you&apos;re not sure about a specified criteria, just skip it. <br />
          Fields with * are mandatory, and if you want go back to a previous
          question, scroll up or click on the green arrows bottom right of your
          screen. Sharing is caring so warm thanks in advance!
        </p>
        <Button
          type="button"
          className="add-new-review__btn"
          onClick={openForm}
          style={{ cursor: 'pointer' }}
        >
          Click to start the review!
        </Button>
      </div>
      <ReactTypeformEmbed
        ref={tf => {
          typeformEmbed = tf;
        }}
        url={urls[type](sitspotId)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: '2',
        }}
        popup
      />
    </>
  );
};
AddReview.propTypes = {
  type: propTypes.oneOf(['STAY', 'EAT', 'SHOP']).isRequired,
  sitspotId: propTypes.string.isRequired,
};

export default AddReview;
