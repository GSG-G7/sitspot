import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Icon } from 'antd';
import { place as getPlaceReviews } from '../../services/api';
import { Button, Fab, ImageCarousel, Review } from '../../components/index';
import backgroundImage from '../../assets/images/back-single.png';

import './style.css';

class SinglePlace extends Component {
  state = {
    sitspot: {
      name: 'you are probably seeing a placeholder',
      country: 'country',
      city: 'city',
      url: 'https://sitspot.herokuapp.com/',
      images: [
        {
          id: 1,
          src:
            'https://res.cloudinary.com/amoodaa/image/upload/v1574670362/IMG_20190611_141513_wdxzb3.jpg',
        },
      ],
      reviews: [],
    },
  };

  componentDidMount() {
    const { type, sitspotId } = this.props;
    const { sitspot } = this.state;
    getPlaceReviews(type, sitspotId).then(({ data: newSitspot }) => {
      this.setState({ sitspot: { ...sitspot, ...newSitspot } });
    });
  }

  render() {
    const { type, sitspotId, history } = this.props;
    const {
      sitspot: { name, country, city, url, images, reviews },
    } = this.state;
    return (
      <>
        <div
          style={{
            background: `url(${backgroundImage}) no-repeat center center/cover`,
          }}
          className="single-place__header-img"
        />
        <div className="placename-search-container">
          <div className="buttons-container">
            <Button
              className="transparent primary-color"
              onClick={() => history.goBack()}
            >
              <Icon type="arrow-left" /> <span>Back to results</span>
            </Button>
            <Button
              onClick={() => {
                history.push(`/add-review/${type}/${sitspotId}`);
              }}
              className="button  primary-background"
            >
              <Icon type="plus" style={{ color: '#fff' }} />
              <span className="button-text"> Add your recommendation</span>
            </Button>
          </div>
          <p className="place-name-location">
            {`${name}, ${city}, ${country}`}{' '}
          </p>
          <a href={url} className="website-link">
            {url}
          </a>
        </div>
        <div className="single-place__slider">
          <ImageCarousel slides={images} smallTitle />
        </div>
        <span className="recommended-by-text">
          Recommended by {reviews.length} contributors
        </span>
        <Fab
          onClick={() => {
            history.push(`/add-review/${type}/${sitspotId}`);
          }}
        />
        <div className="reviews-container">
          {reviews.map(({ reviewId, ...review }) => (
            <Review key={reviewId} review={review} />
          ))}
        </div>
      </>
    );
  }
}

SinglePlace.propTypes = {
  sitspotId: propTypes.string.isRequired,
  type: propTypes.oneOf(['eat', 'stay', 'shop']).isRequired,
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default SinglePlace;
