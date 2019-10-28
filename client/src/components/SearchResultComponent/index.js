import React from 'react';
import propTypes from 'prop-types';
import image from '../../assets/images/placeimg.png';
import './style.css';

const SearchResult = ({ resultArray }) => {
  return (
    <ul className="list">
      {resultArray.map(item => {
        return (
          <li key={item.id} className="list_item">
            <img className="list_item_img" alt="one sitSpot" src={image} />
            <p className>Consect Adip</p>
            <p>Etiam Dapibus</p>
          </li>
        );
      })}
    </ul>
  );
};

SearchResult.propTypes = {
  resultArray: propTypes.arrayOf(propTypes.object).isRequired,
};

export default SearchResult;
