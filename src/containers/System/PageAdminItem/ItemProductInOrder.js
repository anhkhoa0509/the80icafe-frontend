import { connect } from "react-redux";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";
import "./ItemProductInOrder.scss";
import * as actions from "./../../../store/actions";
import * as services from "../../../services/index";
import { Route,Redirect,Link } from "react-router-dom";
import { path } from "../../../utils";
import ModalSendEmail from "./ModalSendEmail"
import LoadingOverlay from 'react-loading-overlay';

class ItemProductInOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sumProduct: 0,
      a: false,
      listProduct: [],
      name: "",
      email: "",
      numberPhone: "",
      address: "",
      time: "",
      isOpenModal: false,
      isLoading: false
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    let value = this.props.listBooking.find((item) => {
      return item.token === token;
    });

    if (value) {
      this.setState({
        id: value.id,
        listProduct: value.listProduct,
        name: value.name,
        email: value.email,
        numberPhone: value.numberPhone,
        address: value.address,
        time: value.createdAt
      });
    }
  }
  handleFormModal = () => {
    this.setState({
        isOpenModal: !this.state.isOpenModal,
    });
};
  componentDidUpdate(prevProps) {
    if (this.props.listBooking !== prevProps.listBooking) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      let value = this.props.listBooking.find((item) => {
        return item.token === token;
      });
      if (value) {
        this.setState({
          id: value.id,
          listProduct: value.listProduct,
          name: value.name,
          email: value.email,
          numberPhone: value.numberPhone,
          address: value.address,
          time: value.createdAt
        });
        this.sumValue();
      }
    }
  }

  sumValue = () => {
    let listProduct = this.state.listProduct;
    let currentSum = 0;
    if (listProduct && listProduct.length > 0) {
      currentSum = listProduct.reduce((total, item) => {
        return total + item.price * item.currentValue;
      }, 0);
    }
    return currentSum
  };

  renderListProduct = () => {
    let listProduct = this.state.listProduct;
    let result = [];
    let sum = 0;
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
        sum = sum + item.currentValue * item.price;
        return (
          <li className="admin-right-item col-xl-12" key={item.token}>
            <span className=" col-xl-1">{index}</span>
            <span className={" col-xl-2"}>{item.name}</span>
            <span className="col-xl-1">{item.currentValue}</span>
            <span className={"col-xl-1"}>{currentSize}</span>
            <span className=" col-xl-3">{item.mess}</span>
            <span className={"col-xl-2"}>
              {item.currentValue * item.price} VND
            </span>
            <span className=" col-xl-2">{this.state.time}</span>
          </li>
        );
      });
    } else {
      return (
        <li className="admin-right-item col-xl-12">
          Số lượng sản phẩm trong giỏ bằng với số lượng tiền trong túi thằng
          viết cái web này!!!
        </li>
      );
    }
   
    return result;
  };
  submitOrder = async (e) =>{
    e.preventDefault();
    this.setState({
      isLoading: true
    })
    let value = await services.userServices.submitOrder({id : this.state.id})
    setTimeout(()=>{
      if(value && value.data.errCode === 0){
        this.setState({
          isLoading: false
        })
        this.handleFormModal()
       
      }
      else{
        this.setState({
          isLoading: false
        })
      }
    },2000)
     
  }
  render() {
    return (
      <div className="adminPage-body col-xl-9">
            <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    className="loading"
                    text='Đang tải dữ liệu cực mạnh, xin đừng hối. Cảm ơn!'
                />
             <ModalSendEmail
                    isOpenModal={this.state.isOpenModal}
                    handleFormModal={this.handleFormModal}
                />
        <p className="admin-title">
          <ReceiptIcon /> Xác nhận đơn hàng
        </p>
        <div className="admin">
          
          <div className="admin-left col-xl-6 p-4">
            <p className="admin-left-header">Thông tin khách hàng</p>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên:</label>
                <input  disabled
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="name"
                  value={this.state.name}
                  placeholder="Vui lòng nhập tên của bạn"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>
                <input  disabled
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={this.state.email}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập nhập email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPhone">
                  Số điện thoại liên hệ:
                </label>
                <input  disabled
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  name="numberPhone"
                  value={this.state.numberPhone}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập số điện thoại"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                <textarea  disabled
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  name="address"
                  value={this.state.address}
                  aria-describedby="emailHelp"
                  placeholder="Vui lòng nhập địa chỉ"
                />
                <small id="emailHelp" className="form-text text-muted">
                  *Thanh toán trực tiếp khi nhận hàng!!!
                </small>
              </div>
            </form>
          </div>
          <div className="admin-right ">
            <p className="admin-right-text">Thông tin đơn hàng</p>
            <ul className="table admin-right-items">
              <li className="admin-right-header col-xl-12">
                <span className="admin-right-header-item col-xl-1">STT</span>
                <span className="admin-right-header-item col-xl-2">Tên</span>
                <span className="admin-right-header-item col-xl-1">
                  Số lượng
                </span>
                <span className="admin-right-header-item col-xl-1">Size</span>
                <span className="admin-right-header-item col-xl-3">
                  Lời nhắn
                </span>
                <span className="admin-right-header-item col-xl-2">Tổng</span>
                <span className="admin-right-header-item col-xl-2">
                  Thời gian
                </span>
              </li>
              {this.renderListProduct()}
              <div className="admin-right-footer">
                <span>Tổng tiền:</span>
                <span>{this.sumValue()} VND</span>
              </div>
            </ul>

            <div className={"div-btn"}>
              <button type="submit" className="btn  btn-submit" onClick = {this.submitOrder}>
                Xác nhận
              </button>
            </div>
          </div>

        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    listBooking: state.admin.listBooking,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemProductInOrder);
