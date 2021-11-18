/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../../store/actions/appActions";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import bannerTree from "./img/bannerTree.jpg"
import bannerCat from "./img/banner-cat.jpg"
import "./HomeBanner.scss"
class HomeBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "-100px -80% 0 0" }}> {dots} </ul>
        </div>
      ),
     
    };
    return (
      <div className="div-banner">
        
        <Slider {...settings}>
          <div>
            <img src={bannerTree} alt="bannerTree" className = "banner" />
          </div>
          <div>
          <img src={bannerCat} alt="bannerTree" className = "banner" />
          </div>
          <div>
            <img src={bannerTree} alt="bannerTree" className = "banner" />
          </div>
          <div>
          <img src={bannerCat} alt="bannerTree" className = "banner" />
          </div>
        </Slider>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
