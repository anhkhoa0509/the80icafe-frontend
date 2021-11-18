/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import map from "./img/map.jpg";
import "./AddressStore.scss";
import { HashRouter as Router } from "react-router-dom";
import store from "./img/store.jpg";
import store_inside from "./img/store-insilde.jpg";
import MapIcon from '@mui/icons-material/Map';
import Slider from "react-slick";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.isMenu !== prevProps.isMenu) {
      this.setState({
        isMenu: this.props.isMenu,
      });
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      appendDots: (dots) => (
        <div>
          <ul style={{ margin: "-76px -76% 0 0" }}> {dots} </ul>
        </div>
      ),
     
    };
    return (
      <React.Fragment>
        <p className="addressStore-title"><MapIcon/>Tại quán</p>
        <div className="addressStore col-xl-12 d-flex">
          <div className="addressStore-left col-xl-6">
            <p className = "header">Không gian quán</p>
            <Slider {...settings}>
              <div>
                <img src={store} alt="store" className="banner" />
              </div>
              <div>
                <img src={store_inside} alt="store" className="banner" />
              </div>
              <div>
                <img src={store} alt="store" className="banner" />
              </div>
              <div>
                <img src={store_inside} alt="bannerTree" className="banner" />
              </div>
            </Slider>
          </div>
          <div className="addressStore-right col-xl-6">
          <p className = "header">Vị trí của quán</p>
            <Router>
              <a
                href="https://goo.gl/maps/oTMLcE11dzEg4zFH8"
                target="_blank"
                className="map-link"
              >
                <img src={map} alt="map" className="map" />
              </a>
            </Router>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeHeader;
