/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./InforProduct.scss";
import { Button } from "reactstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import * as actions from "../../../store/actions";
import { findIndex } from "lodash";
import DOMPurify from "dompurify";


class InforProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentProduct: 1,
      currentSum: 0,
      currentSize: 0,
      currentPrice: 0,
      mess: "",
      item : {}
    };
  }

  // S = -1, M = 0, L = 1
  componentDidMount() {
    let value = this.props.products.find((item) => {
      return item.id === +this.props.match.params.id;
    });

    if(value && value.img){
      let imgBase64 = new Buffer.from(value.img,'base64').toString('binary')
      value.img = imgBase64
    }
    this.setState({
      curentProduct: 1,
      currentPrice: value.price,
      currentSum: value.price,
      currentSize: 0,
      mess: "",
      status: 0,
      item: value
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      let value = this.props.products.find((item) => {
        return item.id === +this.props.match.params.id;
      });
      if(value.img){
        let imgBase64 = new Buffer.from(value.img,'base64').toString('binary')
        value.img = imgBase64
      }
      this.setState({
        curentProduct: 1,
        currentPrice: value.price,
        currentSum: value.price,
        currentSize: 0,
        mess: "",
        status: 0,
        item: value
      });

    }
  }

  toggle = () => {
    this.props.handleFormModal();
  };
  handleValue = (type) => {
    let copyState = { ...this.state };
    if (type === "add") {
      copyState.curentProduct++;
      copyState.currentSum = copyState.currentSum + copyState.currentPrice;
    } else {
      if (copyState.curentProduct > 1) {
        copyState.curentProduct--;
        copyState.currentSum = copyState.currentSum - copyState.currentPrice;
      }
    }
    this.setState({
      curentProduct: copyState.curentProduct,
      currentSum: copyState.currentSum,
    });
  };
  //Thay ?????i gi?? g??c t??y theo l???a ch???n size
  handleSize = (e) => {
    let setSize = 0;
    let deviated = 1;
    let currentValue = 0;
    let valuePrice = this.state.currentPrice;
    if (+e.target.value !== this.state.currentSize) {
      deviated = Math.abs(+e.target.value - this.state.currentSize);
      if (+e.target.value === -1 && +e.target.value < this.state.currentSize) {
        currentValue -= 5000 * deviated;
        valuePrice += currentValue;
        setSize = -1;
      }
      if (+e.target.value === 1 && +e.target.value > this.state.currentSize) {
        deviated = Math.abs(+e.target.value - this.state.currentSize);
        currentValue += 5000 * deviated;
        valuePrice += currentValue;
        setSize = 1;
      }
      if (+e.target.value === 0) {
        if (+e.target.value < this.state.currentSize) {
          currentValue -= 5000 * deviated;
          valuePrice += currentValue;
        }
        if (+e.target.value > this.state.currentSize) {
          currentValue += 5000 * deviated;
          valuePrice += currentValue;
        }
        setSize = 0;
      }
    }
    let sum = valuePrice * this.state.curentProduct;
    this.setState({
      currentSize: setSize,
      currentSum: sum,
      currentPrice: valuePrice,
    });
  };

  handleInput = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  // ?????u ti??n, l??c submit th?? check xem c??i (id, name v???i size) c?? tr??ng v???i thg n??o c?? trong gi??? kh??ng?
  //C??, findindex t??m v??? tr?? c???a n?? => d???a v??o s??? l?????ng sp l??c submit c???ng th??m v??o c??i m??n c?? trong gi???
  // Kh??ng, th??m bt

  getValueForm = () => {
    let { listproducts } = this.props;
    let obj = {
      id: this.state.item.id,
      name: this.state.item.name,
      currentValue: this.state.curentProduct,
      size: this.state.currentSize,
      price: this.state.currentPrice,
      mess: this.state.mess,
    };
    if (listproducts && listproducts.length > 0) {
      let value = findIndex(listproducts, (item) => {
        
        return (
          item.id === this.props.item.id &&
          item.name === this.props.item.name &&
          item.size === this.state.currentSize
        );
      });
      if (value === -1) {
        this.props.addProductToCart(obj);
      } else {
        this.props.changeValueProductInCart(value, this.state.curentProduct);
      }
    } else {
      this.props.addProductToCart(obj);
    }
    this.setState({
      curentProduct: 1,
      currentSum: this.state.item.price,
      currentSize: "",
      mess: "",
    });
  };

  render() {
    let { item } = this.state;
    let { currentSize } = this.state;
    return (
    <div className="inforProduct">
    <div className={"ModalProductCart col-xl-12"}>
      <div>
        <div className="card-product  d-flex">
          <div className="col-xl-6 card-product-left">
            <img src={item.img !== undefined ? item.img : ""} alt="" className="card-img-top-product " />
          </div>
          <div className=" card-product-right col-xl-6">
            <p className="card-title-product">{item.name !== undefined  ? item.name : ""}</p>
            <div className="d-flex gr-change">
              <div className="gr-icon-change">
                <p>S??? l?????ng:</p>
                <div className="icon-change">
                  <RemoveCircleIcon
                    className={
                      this.state.curentProduct <= 1
                        ? "icon-change icon-disabled "
                        : "icon-change"
                    }
                    onClick={() => this.handleValue("remove")}
                  />
                  <span className="current-value">
                    {this.state.curentProduct < 10
                      ? `0${this.state.curentProduct}`
                      : this.state.curentProduct}
                  </span>
                  <AddCircleIcon
                    className="icon-change"
                    onClick={() => this.handleValue("add")}
                  />
                </div>
              </div>
              <div className="change-size" onChange={this.handleSize}>
                <p className="change-size-text">Ch???n Size:</p>
                <div className="d-flex div-radio">
                  <div className="custom-control custom-radio ">
                    <input
                      type="radio"
                      id="customRadio1"
                      name={"currentSize"}
                      value={-1}
                      checked={currentSize === -1}
                      className="custom-control-input"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customRadio1"
                    >
                      Nh???
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="customRadio2"
                      name={"currentSize"}
                      value={0}
                      checked={currentSize === 0}
                      className="custom-control-input"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customRadio2"
                    >
                      V???a
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="customRadio3"
                      name={"currentSize"}
                      value={1}
                      checked={currentSize === 1}
                      className="custom-control-input"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customRadio3"
                    >
                      L???n
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <p className="card-price-product">
              T???ng: {this.state.currentSum} VND
            </p>
            <div className="mess">
              <p>L???i nh???n :</p>
              <textarea
                className="form-control mess"
                id="exampleFormControlTextarea1"
                rows="2"
                name="mess"
                onChange={this.handleInput}
                placeholder="H??y nh???n g???i y??u th????ng v???i ng?????i s??? l??m ly n?????c n??y cho b???n nh?? :v"
              />
            </div>
            <div className="gr-btn">
              <Button color="primary" onClick={this.getValueForm}>
                X??c nh???n
              </Button>{" "}
            </div>
          </div>
        </div>
        <div className="card-product-main">
          <p className="card-product-header">Th??ng tin s???n ph???m</p>
          <div className="card-product-description" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.descriptionHTML),
          }}>

          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.admin.listProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (item) => {
      dispatch(actions.addProductToCart(item));
    },
    changeValueProductInCart: (index, number) => {
      dispatch(actions.changeValueProductInCart(index, number));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InforProduct);
