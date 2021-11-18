import React, { Component } from "react";
import { connect } from "react-redux";
import "./AdminPage.scss";
import * as services from "./../../services/index";
import logo from "./../../assets/images/logo.svg";
import ContactsIcon from "@mui/icons-material/Contacts";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { path } from "../../utils";
import * as actions from "../../store/actions";
import ReceiptIcon from '@mui/icons-material/Receipt';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    this.props.AdminLogout();
  };
  render() {
    return (
      // Quản lí user, sp, bản tin, khuyến mãi
      <div className="adminPage-dashboard col-xl-3">
        <div className="logo">
          <img src={logo} alt="logo" className="img-logo" />
        </div>
        <p className="name-admin">
          <ContactsIcon className="icon" />
          Admin: Anh Khoa
        </p>
        <p className="manage">
          <ManageAccountsIcon className="icon" />
          Quản lý
        </p>
        <ul className="dashboard-items">
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.FULL_LIST_ORDER}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >
              <ShoppingCartIcon className="icon" />
              Đơn hàng hiện tại
            </NavLink>
            <NavLink
              className="nav-link"
              to={path.HISTORY_ORDER}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >
              <ReceiptIcon className="icon" />
              Lịch sử đơn hàng
            </NavLink>
          </li>
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.ADD_USER}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >
            
              <PersonAddIcon className="icon" />
              Thêm người dùng
            </NavLink>
          </li>
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.FULL_ACCOUNT}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white",
               
              }}
            >
           
              <PeopleAltIcon className="icon" />
              Tài khoản người dùng
            </NavLink>
          </li>
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.FULL_PRODUCT}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >

              <CoffeeIcon className="icon" />
              Sản phẩm
            </NavLink>
          </li>
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.ADMIN_NEWS}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >
              <FiberNewIcon className="icon" />
              Bản tin
            </NavLink>
          </li>
          <li className="dashboard-item">
            <NavLink
              className="nav-link"
              to={path.ADMIN_PROMOTION}
              activeStyle={{
                opacity: "1",
                fontWeight: "bold",
                color: "black",
                lineHeight: "60px",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                width: "100%",
                background:"white"
              }}
            >
              {" "}
              <GitHubIcon className="icon" />
              Khuyến mãi
            </NavLink>
          </li>
          <li className="dashboard-item" onClick={this.logout}>
            <LogoutIcon /> Đăng xuất
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    AdminLogout: () => {
      dispatch(actions.AdminLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
