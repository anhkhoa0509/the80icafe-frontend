import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import {BrowserRouter as Router} from "connected-react-router";
import { ToastContainer } from "react-toastify";

import { path } from "../utils";

import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import ConfirmModal from "../components/ConfirmModal";
import CustomScrollbars from "../components/CustomScrollbars";
import Cart from "./HomePage/Cart/Cart";
import HomeHeader from "./HomePage/HomeHeader";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./App.scss";
import FullProduct from "./HomePage/HomePageItem/FullProduct";
import Footer from "./HomePage/Footer";
import News from "./HomePage/HomePageItem/News";
import UserLogin from "./HomePage/HomePageItem/UserLogin";

import AddressStore from "./HomePage/HomePageItem/AddressStore";
import Promotion from "./HomePage/HomePageItem/Promotion";
import InforProduct from "./HomePage/HomePageItem/InforProduct";
import UserAccount from "./HomePage/HomePageItem/UserAccount";

import AdminPage from "./System/AdminPage";
import NotFound from "./HomePage/NotFound";
import FullListOrder from "./System/PageAdminItem/FullListOrder";
import AddUser from "./System/PageAdminItem/AddUser";
import FullAccount from "./System/PageAdminItem/FullAccount";
import FullListNews from "./System/PageAdminItem/FullListNews";
import FullListProduct from "./System/PageAdminItem/FullListProduct";
import AdminPromotion from "./System/PageAdminItem/AdminPromotion";
import ItemProductInOrder from "./System/PageAdminItem/ItemProductInOrder";
import HistoryOrder from "./System/PageAdminItem/HistoryOrder";
import * as actions from "./../store/actions/index";
import Verify from "./HomePage/HomePageItem/Verify";
import NewsItem from "./HomePage/HomePageItem/NewsItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      scrollTop: 0,
      isMenu: false,
      isAdmin: false,
      isUserLogin: false,
      isVerify: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adminLoggedIn !== this.props.adminLoggedIn) {
      this.setState({
        isAdmin: this.props.adminLoggedIn,
      });
    }
    if (prevProps.userLoggedIn !== this.props.userLoggedIn) {
      this.setState({
        isUserLogin: this.props.userLoggedIn,
      });
    }
  }

  onScroll = () => {
    const scrollTop = this.myRef.current;
    let scrollTopCurrent = scrollTop.ref.current.view.scrollTop;
    this.setState({
      scrollTop: scrollTopCurrent,
    });
    if (scrollTopCurrent >= 148) {
      this.setState({
        isMenu: true,
      });
    } else {
      this.setState({
        isMenu: false,
      });
    }
  };
  onClick = () => {
    const scrollTop = this.myRef.current;
    scrollTop.ref.current.view.scrollTop = 0;
  };
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
    this.setState({
      isAdmin: this.props.adminLoggedIn,
      isUserLogin: this.props.userLoggedIn,
    });
  }

  renderIsAdminLogin = () => {
    return (
      <div className={"adminPage col-xl-12 d-flex"}>
        <AdminPage />
        <Redirect to={path.FULL_LIST_ORDER} />
        <Switch>
          <Route path={path.FULL_LIST_ORDER} component = {FullListOrder}/>
          
          <Route
            path={path.ITEM_IN_ORDER}
            render={(matchProps) => (
              <ItemProductInOrder {...matchProps} {...this.props} />
            )}
          />
          <Route path={path.HISTORY_ORDER} component={HistoryOrder}/>
          <Route path={path.ADD_USER} component={AddUser}/>
          <Route path={path.FULL_ACCOUNT} component={FullAccount}/>
          <Route path={path.ADMIN_NEWS} component={FullListNews}/>
          <Route path={path.FULL_PRODUCT} component={FullListProduct}/>
          <Route path={path.ADMIN_PROMOTION} component={AdminPromotion}/>
          <Route path={path.ADMIN} component={AdminPage}/>
        </Switch>
      </div>
    );
  };

  redirectLink = () => {
    const pathname = window.location.href;
    let currentPath = `${path.VERIFY}/${window.location.search}`
    if (this.state.isUserLogin && !window.location.search) {
      return <Redirect to={path.USER_ACCOUNT} />;
    } 
    if (window.location.search && window.location.search) {
      return <Redirect to={currentPath} />;
    }
    else {
      return <Redirect to={path.HOMEPAGE} />;
    }
  };

  renderIsUserLogin = () => {
    return (
      <div>
        <HomeHeader isMenu={this.state.isMenu} />
        {this.redirectLink()}
        <Switch>
          <Route
            path={path.VERIFY}
            render={(matchProps) => <Verify {...matchProps} {...this.props} />}
          />
          <Route path={path.USERLOGIN} component={UserLogin} />
          <Route path={path.CART}>
            <Cart />
          </Route>
          <Route
            path={path.ITEM_NEWS}
            render={(matchProps) => (
              <NewsItem {...matchProps} {...this.props} />
            )}
          />
          <Route path={path.NEWS}>
            <News />
          </Route>
          <Route path={path.USER_ACCOUNT}>
            {this.state.isUserLogin ? <UserAccount /> : <NotFound />}
          </Route>
          <Route path={path.STORE}>
            <AddressStore />
          </Route>
          <Route path={path.ORDER}>
            <FullProduct />
          </Route>
          <Route path={path.PROMOTION}>
            <Promotion />
          </Route>
          <Route
            path={path.INFOR_PRODUCT}
            render={(matchProps) => (
              <InforProduct {...matchProps} {...this.props} />
            )}
          />
          <Route exact path={path.HOMEPAGE}>
            <HomePage />
          </Route>

          <Route path={path.HOME}>
            <HomePage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  };

  render() {
    let { isMenu, isAdmin } = this.state;
    return (
      <Router>
        <div className="main-container">
          <CustomScrollbars
            style={{ height: "100vw", with: "100vw", position: "unset" }}
            ref={this.myRef}
            onScroll={this.onScroll}
          >
            <ConfirmModal />
            <div className="content-container">
              <div
                className={isMenu ? "arrow-up" : "arrow-up active-arrow"}
                onClick={this.onClick}
              >
                <KeyboardArrowUpIcon className="icon-arrow" />
              </div>
              {/*Nếu admin đăng nhập thfi sẽ ẩn cái mennu này và hiện cái dashboar assmin*/}

              {isAdmin ? this.renderIsAdminLogin() : this.renderIsUserLogin()}
              <Footer />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </CustomScrollbars>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    userLoggedIn: state.user.userLoggedIn,
    adminLoggedIn: state.admin.adminLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
