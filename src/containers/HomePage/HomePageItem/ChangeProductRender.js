/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/appActions";
import coffe from "./img/coffe.png";
import food from "./img/food.jpg";
import tea from "./img/tea.png";
import "./ChangeProductRender.scss";
import ArticleIcon from '@mui/icons-material/Article';
class ChangeProductRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: 0,
    };
  }
  onClick = (number) => {
    if (this.state.isActive === +number) {
      this.setState({
        isActive: 0,
      });
    } else {
      this.setState({
        isActive: +number,
      });
    }
  };
  render() {
    this.props.changeValue(this.state.isActive)
    return (
      <div className="change-product ">
        <p className="full-product-header"><ArticleIcon className = "icon-product"/>Sản phẩm có tại the 80's</p>
        <div className="col-sm-12 full-product-body d-flex">
          <div className="col-sm-4">
            <div className="background-coffe">
              <img
                src={coffe}
                onClick={() => this.onClick("1")}
                className={
                  this.state.isActive === 1 ? "coffe active" : "coffe "
                }
                alt="coffe"
              />
              <p className="background-coffe-text">Cà Phê</p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="background-coffe">
              <img
                src={coffe}
                className={this.state.isActive === 2 ? "coffe active" : "coffe "}
                alt="food"
                onClick={() => this.onClick("2")}
              />
              <p className="background-coffe-text">Trà</p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="background-coffe">
              <img
                src={tea}
                className={this.state.isActive === 3 ? "coffe active" : "coffe"}
                onClick={() => this.onClick("3")}
                alt="tea"
              />
              <p className="background-coffe-text">Thức ăn</p>
            </div>
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeProductRender);
