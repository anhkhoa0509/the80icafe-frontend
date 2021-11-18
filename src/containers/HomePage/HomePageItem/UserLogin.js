import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./UserLogin.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import * as services from "../../../services/index";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      emaildk: "",
      emaildn: "",
      numberPhone: "",
      address: "",
      passworddk: "",
      passworddn: "",
      errors: {
        emaildn: "",
        passworddn: "",
        emaildk: "",
        numberPhone: "",
        address: "",
        passworddk: "",
        name: "",
      },
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.name =
          value.length < 4 ? "Vui lòng nhập tên của bạn!" : "";
        break;
      case "emaildk":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Vui lòng nhập email của bạn!!!";
        break;
      case "numberPhone":
        errors.numberPhone =
          value.length < 8 ? "SDT ít nhất phải có 8 chữ số!!!" : "";
        break;
      case "address":
        errors.address =
          value.length < 8 ? "Người anh em cho tôi xin cái địa chỉ!!!" : "";
        break;
      case "passworddk":
        errors.passworddn =
          value.length < 5 ? "Mật khẩu ít nhất phải có 6 ký tự!!!" : "";
        break;

      case "emaildn":
        errors.emaildn = validEmailRegex.test(value)
          ? ""
          : "Vui lòng nhập tài khoản của bạn!!!";
        break;
      case "passworddn":
        errors.passworddn =
          value.length < 5 ? "Mật khẩu ít nhất phải có 6 ký tự!!!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  SubmitDK = async (e) => {
    e.preventDefault();
    let { name, emaildk, numberPhone, address, passworddk } =
      this.state;
    if (name && emaildk && numberPhone && address && passworddk) {
      let check = validateForm(this.state.errors);
      if (check) {
        let value = await services.userServices.createUser({
          fullname: name,
          email : emaildk,
          numberPhone,
          address,
          password : passworddk,
          roleID : 0
        });
        if (value.data && value.data.errCode === 0) {
            toast.success("Thêm người dùng thành công!!!");
            this.setState({
                name: "",
                emaildk: "",
                emaildn: "",
                numberPhone: "",
                address: "",
                passworddk: "",
                passworddn: "",
                errors: {
                  emaildn: "",
                  passworddn: "",
                  emaildk: "",
                  numberPhone: "",
                  address: "",
                  passworddk: "",
                  name: "",
                },
            })
        } else {
            toast.warn("Người dùng tồn tại!!!");
        }
      } else {
        toast.warn("Thêm người dùng thất bị!!!");
      }
    }
  };

  SubmitDN = (e) => {
    e.preventDefault();
    let { emaildn, passworddn } = this.state;
    if (emaildn && passworddn) {
      let check = validateForm(this.state.errors);
      if (check) {
        this.props.handleAPI(emaildn, passworddn);
      }
    } else {
      toast.warn("Email hoặc password rỗng!!!");
    }
  };

  render() {
    let { errors } = this.state;
    return (
      <>
        <p className="login-title">
          <AccountCircleIcon /> TÀI KHOẢN
        </p>
        <div className="login col-xl-12 d-flex">
          <div className="login-left col-xl-6 p-4">
            <p className="login-left-header">Đăng ký</p>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên:</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="name"
                  onChange={this.handleInput}
                  placeholder="Vui lòng nhập tên của bạn"
                  required
                />
                {errors.name.length > 0 && (
                  <span className="error">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="emaildk"
                  onChange={this.handleInput}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập nhập email"
                /> {errors.emaildk.length > 0 && (
                    <span className="error">{errors.emaildk}</span>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="passworddk"
                  onChange={this.handleInput}
                  placeholder="Vui lòng nhập mật khẩu"
                  required
                />{errors.passworddk.length > 0 && (
                    <span className="error">{errors.passworddk}</span>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPhone">
                  Số điện thoại liên hệ:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  name="numberPhone"
                  onChange={this.handleInput}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập số điện thoại"
                />{errors.numberPhone.length > 0 && (
                    <span className="error">{errors.numberPhone}</span>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  name="address"
                  onChange={this.handleInput}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập địa chỉ"
                />{errors.address.length > 0 && (
                    <span className="error">{errors.address}</span>
                  )}
              </div>
              <div className={"div-btn"}>
                <button
                  type="submit"
                  className="btn btn-submit"
                  onClick={this.SubmitDK}
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
          <div className="login-right col-xl-6">
            <p className="login-right-header">Đăng nhập</p>
            <form onSubmit={this.SubmitDN} noValidate>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="emaildn"
                  onChange={this.handleInput}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập nhập email"
                />
                {errors.emaildn.length > 0 && (
                  <span className="error">{errors.emaildn}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="passworddn"
                  onChange={this.handleInput}
                  placeholder="Vui lòng nhập mật khẩu"
                  required
                />
                {errors.passworddn.length > 0 && (
                  <span className="error">{errors.passworddn}</span>
                )}
              </div>
              <div className={"div-btn"}>
                <button type="submit" className="btn btn-submit">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAPI: (email, password) => {
      dispatch(actions.handleLogin(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
