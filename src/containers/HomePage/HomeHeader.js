/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./HomeHeader.scss";
import { connect } from "react-redux";
import logo from "./../../assets/images/logo.svg";
import * as actions from "../../store/actions/appActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom";
import { path } from "../../utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: false,
      currentValue: 0,
      name: ""
    };
  }

  componentDidMount() {
    this.isValueProductInCart(this.props.listProduct);
    this.setState({
      currentValue: this.props.numberProductInCart,
    });
    if(this.props.userInfo && this.props.userInfo.fullname){
        this.setState({
            name: this.props.userInfo.fullname
        })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.numberProductInCart !== prevProps.numberProductInCart) {
      this.setState({
        currentValue: this.props.numberProductInCart,
      });
    }
    if (this.props.isMenu !== prevProps.isMenu) {
      this.setState({
        isMenu: this.props.isMenu,
      });
    }
    if(this.props.userInfo !== prevProps.userInfo) {
        if(this.props.userInfo && this.props.userInfo.fullname){
            this.setState({
                name: this.props.userInfo.fullname
            })
        }
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  isValueProductInCart = (listProduct) => {
    let result = 0;
    if (listProduct && listProduct.length > 0) {
      result = listProduct.reduce((sum, item) => {
        return sum + item.currentValue;
      }, 0);
    }
    this.setState({
      currentValue: result,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container pagehome-header-background">
          <div className="pagehome-header">
            <div className="pagehome-header-top d-flex">
              <div className="col-sm-3">
                <Link className="navbar-brand pagehome-bg-header" to="/home">
                  <img src={logo} className="pagehome-header-logo" alt="logo" />
                </Link>
              </div>
              <div className="col-sm-6 pagehome-header-mid">
                <h6 className="header-mid-top">Cà phê được cái rất ngầu...</h6>
                <p className="header-mid-description">
                  ...ngao du đến đâu, cà phê bèn hoà nhập và trở thành dân địa
                  phương ở đấy. Mỗi quốc gia, vùng miền đều có cách uống cà phê
                  riêng. Thưởng thức cà phê, vì vậy, cũng là cách để thưởng thức
                  một phần văn hoá bản địa.
                </p>
              </div>
              <div className="col-sm-3 pagehome-header-login">
              {this.props.userLoggedIn ? <Link to={path.USER_ACCOUNT} className="login">
                  <AccountCircleIcon className="icon-user" />
                  <p>{this.state.name} </p>
                </Link> : <Link to={path.USERLOGIN} className="login">
                  <AccountCircleIcon className="icon-user" />
                  <p>Đăng nhập</p>
                </Link>}
                
              </div>
            </div>
            <nav
              className={
                this.state.isMenu
                  ? "navbar navbar-expand-lg navbar-light active-fixed col-xl-12"
                  : "navbar navbar-expand-lg navbar-light col-xl-12"
              }
            >
              <NavLink
                exact
                to={path.HOMEPAGE}
                className="home  col-xl-3"
                style={{ color: "black" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#242052",
                }}
              >
                Trang chủ
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse col-xl-6" id="navbarNav">
                <ul className="navbar-nav list-items-header">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={path.ORDER}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#242052",
                      }}
                    >
                      Đặt hàng
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={path.NEWS}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#242052",
                      }}
                    >
                      Tin tức
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      to={path.STORE}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#242052",
                      }}
                    >
                      Cửa hàng
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      to={path.PROMOTION}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#242052",
                      }}
                    >
                      Khuyến mãi
                    </NavLink>
                  </li>
                </ul>
              </div>

              <Link to={path.CART} className="cart col-xl-3">
                <div>

                <ShoppingCartIcon
                  sx={{ color: "black" }}
                  className="icon_cart"
                />
                <span className="current-product">
                  {this.state.currentValue}
                </span>
                </div>
                <span className="cart-text">Giỏ hàng</span>
              </Link>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    userLoggedIn: state.user.userLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    listProduct: state.user.listProductInCart,
    numberProductInCart: state.user.numberProductInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
