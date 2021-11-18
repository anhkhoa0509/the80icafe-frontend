/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
class Promotion extends Component {
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
          <ul style={{ margin: "-60px -80% 0 0" }}> {dots} </ul>
        </div>
      ),
     
    };
    return (
      <React.Fragment>
       <h1>Khuyến mãi hoặc thông tin giải đấu sẽ được viết ở đây</h1>
      </React.Fragment>
    );
  }
}

export default Promotion;
