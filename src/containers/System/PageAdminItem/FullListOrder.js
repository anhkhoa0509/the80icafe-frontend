import { connect } from "react-redux";
import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";
import "./ItemProductInOrder.scss";
import * as actions from "./../../../store/actions";
import { Link } from "react-router-dom";

class FullListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      sumProduct: 0,
      a: false,
    };
  }

  componentDidMount = async () => {
    await this.props.getAllOrder();
    let { listBooking } = this.props;
    let result = [];
    if (listBooking && listBooking.length > 0) {
      result = listBooking.map((booking) => {
        booking.listProduct = JSON.parse(booking.listProduct);
        return booking;
      });
    }
    this.setState({
      listProduct: result,
    });
  };

  componentDidUpdate(prevProps) {
  //   setTimeout(
  //     function  () {
  //        this.props.getAllOrder();
  //     }
  //     .bind(this),
  //     5000
  // );
    if (this.props.listBooking !== prevProps.listBooking) {
      let { listBooking } = this.props;
      let result = [];
      if (listBooking && listBooking.length > 0) {
        result = listBooking.map((booking) => {
          booking.listProduct = JSON.parse(booking.listProduct);
          return booking;
        });
      }
      this.setState({
        listProduct: result,
      });
    }
  }


  renderListProduct = () => {
    let result = [];
    let { listProduct } = this.state;
    if (listProduct && listProduct.length > 0) {
      result = listProduct.map((item, index) => {
        let currentValue = 0;
        let sum = 0;
        if (item.listProduct && item.listProduct.length > 0) {
          item.listProduct.map((item) => {
            currentValue = currentValue + item.currentValue;
          }, 0);
        }
        return (
          <li className="admin-right-item col-xl-12" key={item}>
            <span className="admin-right-header-item col-xl-1">{index}</span>
            <span className="admin-right-header-item col-xl-3">
              {item.name}
            </span>
            <span className="admin-right-headfr-item col-xl-1">
              {currentValue}
            </span>
            <span className="admin-right-header-item col-xl-2">{item.price}</span>
            <span className="admin-right-header-item col-xl-2">
              {item.createdAt}
            </span>
            <span className="admin-right-header-item col-xl-3">
              <Link to={`/admin/item-order/?token=${item.token}`}>
                <button type="submit" className="btn btn-submit btn-all-item">
                  Xác nhận
                </button>
              </Link>
            </span>
          </li>
        );
      });
    } else {
      return (
        <li className="admin-right-item col-xl-12">
          <p className = "text-cart">Hiện tại không có đơn, nhưng tí nữa sẽ có!!!</p>
         
        </li>
      );
    }
  
    return result;
  };

  render() {
    return (
      <div className="adminPage-body col-xl-9">
        <p className="admin-title">
          <ReceiptIcon />
          Tất cả đơn hàng
        </p>
        <div className="admin">
          <div className="admin-right ">
            <p className="admin-right-text">Thông tin đơn hàng</p>
            <ul className="table admin-right-items">
              <li className="admin-right-header col-xl-12">
                <span className="admin-right-header-item col-xl-1">STT</span>
                <span className="admin-right-header-item col-xl-3">
                  Tên khách
                </span>
                <span className="admin-right-header-item col-xl-1">
                  Số lượng
                </span>
                <span className="admin-right-header-item col-xl-2">Tổng</span>
                <span className="admin-right-header-item col-xl-2">
                  Thời gian
                </span>
                <span className="admin-right-header-item col-xl-3">
                  Xác nhận
                </span>
              </li>
              {this.renderListProduct()}
             
            </ul>
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
    getAllOrder: () => {
      dispatch(actions.getAllOrder());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullListOrder);
