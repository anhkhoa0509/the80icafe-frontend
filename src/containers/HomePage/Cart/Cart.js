import { connect } from "react-redux";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";
import "./Cart.scss";
import * as actions from "./../../../store/actions";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import * as services from "../../../services";
import { toast } from "react-toastify";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).find((val) => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      sumProduct: 0,
      a: false,
      isLogin: false,
      name: "",
      email: "",
      numberPhone: "",
      address: "",
      errors: {
        name: "",
        email: "",
        numberPhone: "",
        address: "",
      },
    };
  }

  componentDidMount() {
    let { listproducts } = this.props;
    if (listproducts && listproducts.length > 0) {
      this.sumValue(listproducts);
      this.setState({
        listProduct: listproducts,
        isLogin: this.props.userLoggedIn,
      });
    }
    this.setState({
      isLogin: this.props.userLoggedIn,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.listproducts !== prevProps.listproducts) {
      this.setState({
        listProduct: this.props.listproducts,
      });
    }
    if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
      this.setState({
        isLogin: this.props.userLoggedIn,
      });
    }
  }

  handleValue = (type, index) => {
    let { listProduct } = this.state;
    let copylistProduct = listProduct;
   
    if (type === "add") {
      copylistProduct[index].currentValue =
        copylistProduct[index].currentValue + 1;
      copylistProduct[index].sum =
        copylistProduct[index].currentValue * copylistProduct[index].price;
    } else {
      if (
        copylistProduct[index].currentValue &&
        copylistProduct[index].currentValue > 1
      ) {
        copylistProduct[index].currentValue =
          copylistProduct[index].currentValue - 1;
        copylistProduct[index].sum =
          copylistProduct[index].currentValue * copylistProduct[index].price;
      }
    }
    this.sumValue(copylistProduct);
    this.props.changeListProduct(copylistProduct);
    this.setState({
      listProduct: copylistProduct,
    });
  };

  sumValue = (listProduct) => {
    let value = 0;
    if (listProduct && listProduct.length > 0) {
      value = listProduct.reduce((total, item) => {
        return total + item.price * item.currentValue;
      }, 0);
    }
    this.setState({
      sumProduct: value,
    });
  };

  renderListProduct = (listProduct) => {
    let result = [];
    if (listProduct && listProduct.length > 0) {
      result = listProduct.map((item, index) => {
        let currentSize = "";
        if (item.size === -1) {
          currentSize = "S";
        }
        if (item.size === 0) {
          currentSize = "M";
        }
        if (item.size === 1) {
          currentSize = "L";
        }
        this.state.sum += item.sum;
        return (
          <li className="cart-right-item col-xl-12" key={item}>
            <span className={"cart-right-item-header col-xl-4"}>
              {item.name}
            </span>
            <div className={"col-xl-3"}>
              <div className="gr-icon-change">
                <RemoveCircleIcon
                  className={
                    item.currentValue > 1
                      ? "icon-change "
                      : "icon-change icon-disabled"
                  }
                  onClick={() =>
                    this.handleValue(
                      "remove",
                      index,
                      item.currentValue,
                      item.price
                    )
                  }
                />
                <span className="current-value">
                  {item.currentValue > 10
                    ? item.currentValue
                    : `0${item.currentValue}`}
                </span>
                <AddCircleIcon
                  className="icon-change"
                  onClick={() =>
                    this.handleValue(
                      "add",
                      index,
                      item.currentValue,
                      item.price
                    )
                  }
                />
              </div>
            </div>
            <span className={"col-xl-2"}>{currentSize}</span>
            <span className={"col-xl-3 sumPrice"}>
              {item.currentValue * item.price} VND{" "}
              <ClearIcon
                className={"icon-clear"}
                onClick={() => this.deleteItem(item)}
              />
            </span>
          </li>
        );
      });
    } else {
      return (
        <li className="cart-right-item col-xl-12">
          <p>
            S??? l?????ng s???n ph???m trong gi??? b???ng v???i s??? l?????ng ti???n trong t??i th???ng
            vi???t c??i web n??y!!!
          </p>
        </li>
      );
    }
    return result;
  };

  deleteItem = (item) => {
    let { listProduct } = this.state;
    this.setState({ a: !this.state.a });
    if (listProduct && listProduct.length > 0) {
      this.props.deleteItemInCart(item);
      this.sumValue(listProduct);
      this.renderListProduct(this.state.listProduct);
    }
  };

  handleInput = (e) => {
    e.preventDefault();
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let errors = this.state.errors;
    switch (name) {
      case "name":
        errors.name =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Vui l??ng nh???p email c???a b???n!!!";
        break;
      case "numberPhone":
        errors.numberPhone =
          value.length < 8 ? "SDT ??t nh???t ph???i c?? 8 ch??? s???!!!" : "";
        break;
      case "address":
        errors.address =
          value.length < 8 ? "Ng?????i anh em cho t??i xin c??i ?????a ch???!!!" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  submitCart = async () => {
    if (this.props.userInfo && this.props.userInfo.id) {
      let obj = {
        userID: this.props.userInfo.id,
        name: this.props.userInfo.fullname,
        listProduct: JSON.stringify(this.state.listProduct),
        price: this.state.sumProduct,
        address: this.props.userInfo.address,
        numberPhone: this.props.userInfo.numberPhone,
        email: this.props.userInfo.email,
      };
      let check = validateForm(this.state.errors);
      if (check && this.state.listProduct) {
        let value = await services.userServices.OderConfirm(obj);
        if (value.data && value.data.errCode === 0) {
          this.setState({
            listProduct: [],
            sumProduct: 0,
            a: false,
            isLogin: false,
          });
          this.props.clearListCart();
        }
      } 
      else {
        toast.warn("Vui l??ng nh???p th??ng tin ????? x??c nh???n!");
      }
    } else {
      // name: "",
      // email: "",
      // numberPhone: "",
      // address: "",
      alert("day la truogn hop chua login");
      let obj = {
        name: this.state.name,
        listProduct: JSON.stringify(this.state.listProduct),
        price: this.state.sumProduct,
        address: this.state.address,
        numberPhone: this.state.numberPhone,
        email: this.state.email,
      };
      let checkForm = validateForm(this.state.errors);
      if (checkForm && this.state.listProduct.length > 0&&this.state.numberPhone.length>0) {
        let value = await services.userServices.OderConfirm(obj);
        if (value.data && value.data.errCode === 0) {
          this.setState({
            listProduct: [],
            sumProduct: 0,
            a: false,
            isLogin: false,
            name: "",
            email: "",
            numberPhone: "",
            address: "",
          });
          toast.success("?????t h??ng th??nh c??ng!");
          this.props.clearListCart();
        }
      } 
      else {
        toast.warn("Vui l??ng nh???p th??ng tin ????? x??c nh???n!");
      }
    }
  };

  render() {
    let { errors } = this.state;
    return (
      <>
        <p className="cart-title">
          <ReceiptIcon /> X??c nh???n ????n h??ng
        </p>
        <div className="cart col-xl-12 d-flex">
          {this.state.isLogin ? (
            <div className="cart-right col-xl-8 " style={{ margin: "0 auto" }}>
              <p className="cart-right-text">Th??ng tin ????n h??ng</p>
              <ul className="table cart-right-items">
                <li className="cart-right-header col-xl-12">
                  <span className="cart-right-header-item col-xl-4">T??n</span>
                  <span className="cart-right-header-item col-xl-3">
                    S??? l?????ng
                  </span>
                  <span className="cart-right-header-item col-xl-2">Size</span>
                  <span className="cart-right-header-item col-xl-3">T???ng</span>
                </li>

                {this.renderListProduct(this.state.listProduct)}
                <div className="cart-right-footer">
                  <span>T???ng ti???n:</span>
                  <span>{this.state.sumProduct} VND</span>
                </div>
              </ul>

              <div className={"div-btn"}>
                <button
                  type="submit"
                  className="btn  btn-submit"
                  onClick={this.submitCart}
                >
                  X??c nh???n
                </button>
              </div>
            </div>
          ) : (
            <div className="col-xl-12 d-flex">
              <div className="cart-left col-xl-6 p-4">
                <p className="cart-left-header">Th??ng tin c???a b???n</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">T??n:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="name" value = {this.state.name}
                      onChange={this.handleInput}
                      placeholder="Vui l??ng nh???p t??n c???a b???n"
                      required
                    />
                    {errors.name.length > 0 && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email:</label>
                    <input
                      onChange={this.handleInput}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value = {this.state.email}
                      aria-describedby="emailHelp"
                      placeholder="Vui l??ng nh???p nh???p email"
                    />
                    {errors.email.length > 0 && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPhone">
                      S??? ??i???n tho???i li??n h???:
                    </label>
                    <input
                      onChange={this.handleInput}
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      name="numberPhone" value = {this.state.numberPhone}
                      aria-describedby="emailHelp"
                      placeholder="Vui l??ng nh???p s??? ??i???n tho???i"
                    />
                    {errors.numberPhone.length > 0 && (
                      <span className="error">{errors.numberPhone}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress">?????a ch???:</label>
                    <input
                      onChange={this.handleInput}
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      name="address" value = {this.state.address}
                      aria-describedby="emailHelp"
                      placeholder="Vui l??ng nh???p ?????a ch???"
                    />
                    {errors.address.length > 0 && (
                      <span className="error">{errors.address}</span>
                    )}
                    <small id="emailHelp" className="form-text text-muted">
                      *Thanh to??n tr???c ti???p khi nh???n h??ng!!!
                    </small>
                  </div>
                </form>
              </div>
              <div className="cart-right col-xl-6">
                <p className="cart-right-text">Th??ng tin ????n h??ng</p>
                <ul className="table cart-right-items">
                  <li className="cart-right-header col-xl-12">
                    <span className="cart-right-header-item col-xl-4">T??n</span>
                    <span className="cart-right-header-item col-xl-3">
                      S??? l?????ng
                    </span>
                    <span className="cart-right-header-item col-xl-2">
                      Size
                    </span>
                    <span className="cart-right-header-item col-xl-3">
                      T???ng
                    </span>
                  </li>

                  {this.renderListProduct(this.props.listproducts)}
                  <div className="cart-right-footer">
                    <span>T???ng ti???n:</span>
                    <span>{this.state.sumProduct} VND</span>
                  </div>
                </ul>

                <div className={"div-btn"}>
                  <button
                    type="submit"
                    className="btn  btn-submit"
                    onClick={this.submitCart}
                  >
                    X??c nh???n
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.user.userLoggedIn,
    userInfo: state.user.userInfo,
    listproducts: state.user.listProductInCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeListProduct: (list) => {
      dispatch(actions.changeListProduct(list));
    },
    deleteItemInCart: (item) => {
      dispatch(actions.deleteItemInCart(item));
    },
    clearListCart: () => {
      dispatch(actions.clearListCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
