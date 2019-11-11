import React, { Component } from 'react';

import { Search, ImageCarousel } from '../../components/index';
import fakeImages from '../../components/ImageCarousel/fakeData';
import plantIcon from '../../assets/images/icon-sign.svg';

import './style.css';

class Home extends Component {
  // eslint-disable-next-line no-unused-vars
  getSitSpots = data => {
    // move to the searchResult route and send search creteria to it
  };

  render() {
    return (
      <div className="home">
        <div className="home__top-container header-container">
          <p className="home__top-container__slagon ">
            Where conscious travellers find their feel good
          </p>
          <div className="home__top-container__search">
            <Search getSitSpots={this.getSitSpots} />
          </div>
        </div>
        <div className="home__second-container">
          <div className="home__welcome-container ">
            <img alt="plant icon" src={plantIcon} />
            <p className="home__welcome-container__text">
              Welcome to our beta site
            </p>
            <img alt="plant icon" src={plantIcon} />
          </div>
          <p className="home__value-paragragh">
            We believe that we can change the world together. Join our community
            of like-minded conscious travellers.
          </p>
          <p className="home__value-paragragh">
            find and recommend sustainable businesses which deserve kudos.
            We&apos;ll even plant a tree each time we publish a new
            recommendation!
          </p>
          <p className="home__value-paragragh">
            Your feedback is essential in shaping the future of SitSpot. We
            can&apos;t wait to hear from you.
          </p>
          <p className="home__slider-title">Suggested sitspots</p>
          <ImageCarousel
            slides={fakeImages}
            haveDots={false}
            className="home__slider"
          />
        </div>
      </div>
    );
  }
}

export default Home;
