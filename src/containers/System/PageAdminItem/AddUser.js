import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddUser.scss";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import * as services from "../../../services/index";
import PersonAdd from '@mui/icons-material/PersonAdd';


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

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: "",
      fullname: "",
      email: "",
      numberPhone: "",
      address: "",
      password: "",
      roleID: 0,
      errors: {
        fullname: "",
        email: "",
        numberPhone: "",
        address: "",
        password: "",
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
      case "fullname":
        errors.fullname =
          value.length < 6 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "Password must be 6 characters long!" : "";
        break;
      case "numberPhone":
        errors.numberPhone =
          value.length < 9 ? "Number must be 9 characters long!" : "";
        break;
      case "address":
        errors.address = value.length < 6 ? "Address is Null" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  componentDidUpdate(prevProps) {
    if (this.props.errCode !== prevProps.errCode) {
      this.setState({
        currentCode: this.props.errCode,
      });
    }
  }
  SubmitDK = async (e) => {
    e.preventDefault();
    let { fullname, email, numberPhone, address, password, roleID } =
      this.state;
    if (fullname && email && numberPhone && address && password) {
      let check = validateForm(this.state.errors);
      if (check) {
        let value = await services.userServices.createUser({
          fullname,
          email,
          numberPhone,
          address,
          password,
          roleID,
        });
        if (value.data && value.data.errCode === 0) {
            toast.success("Th??m ng?????i d??ng th??nh c??ng!!!");
            this.setState({
                currentCode: "",
                fullname: "",
                email: "",
                numberPhone: "",
                address: "",
                password: "",
                roleID: 0,
                errors: {
                  fullname: "",
                  email: "",
                  numberPhone: "",
                  address: "",
                  password: "",
                },
            })
        } else {
            toast.warn("Ng?????i d??ng t???n t???i!!!");
        }
      } else {
        toast.warn("Th??m ng?????i d??ng th???t b???!!!");
      }
    }
  };

  render() {
    let { errors } = this.state;
    return (
      <div className="addUser col-xl-12">
        <div className="login-left col-xl-6 p-4">
          <p className="admin-title"> <PersonAdd className="icon"/>Th??m ng?????i d??ng</p>
          <form onSubmit={this.SubmitDK} noValidate>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">T??n:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="fullname"
                value = {this.state.fullname}
                onChange={this.handleInput}
                placeholder="Vui l??ng nh???p t??n c???a b???n"
                required
              />
              {errors.fullname.length > 0 && (
                <span className="error">{errors.fullname}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email:</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value = {this.state.email}
                onChange={this.handleInput}
                aria-describedby="emailHelp"
                placeholder="Vui l??ng nh???p nh???p email"
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">M???t kh???u:</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value = {this.state.password}
                onChange={this.handleInput}
                placeholder="Vui l??ng nh???p m???t kh???u"
                required
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPhone">S??? ??i???n tho???i li??n h???:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPhone"
                name="numberPhone"
                value = {this.state.numberPhone}
                onChange={this.handleInput}
                aria-describedby="emailHelp"
                placeholder="Vui l??ng nh???p s??? ??i???n tho???i"
                required
              />
              {errors.numberPhone.length > 0 && (
                <span className="error">{errors.numberPhone}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputAddress">?????a ch???:</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                name="address"
                value = {this.state.address}
                onChange={this.handleInput}
                aria-describedby="emailHelp"
                placeholder="Vui l??ng nh???p ?????a ch???"
                required
              />
              {errors.address.length > 0 && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <div className={"div-btn"}>
              <button
                type="submit"
                className="btn btn-submit"
                onClick={this.SubmitDK}
              >
                ????ng k??
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errCode: state.admin.errCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch(actions.addUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
