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
      listHistory: [],
      sumProduct: 0,
      a: false,
    };
  }

  componentDidMount = async () => {
    await this.props.historyOrderUser({ id: "ALL" });
    let { listHistory } = this.props;
    let result = [];
    if (listHistory && listHistory.length > 0) {
      result = listHistory.map((booking) => {
        booking.listHistory = JSON.parse(booking.listHistory);
        return booking;
      });
    }
    this.setState({
      listHistory: result,
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
    if (this.props.listHistory !== prevProps.listHistory) {
      let { listHistory } = this.props;
      let result = [];
      if (listHistory && listHistory.length > 0) {
        result = listHistory.map((booking) => {
          booking.listProduct = JSON.parse(booking.listProduct);
          return booking;
        });
      }
      this.setState({
        listHistory: result,
      });
    }
  }
  renderList = (listProduct) => {
    if (listProduct && listProduct.length > 0) {
    }
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
                <span className="admin-right-header-item col-xl-3">Tên</span>
                <span className="admin-right-header-item col-xl-3">Token</span>
                <span className="admin-right-header-item col-xl-1">
                  Số lượng
                </span>
                <span className="admin-right-header-item col-xl-2">Tổng</span>
                <span className="admin-right-header-item col-xl-3">
                  Ngày mua
                </span>
              </li>
              {this.state.listHistory &&
                this.state.listHistory.map((item) => {
                  let currentValue = 0;
                  let sum = 0;
                  if (item.listProduct && item.listProduct.length > 0) {
                    item.listProduct.map((item) => {
                      currentValue = currentValue + item.currentValue;
                    }, 0);
                  }
                  return (
                    <li className="admin-right-item col-xl-12" key={item.token}>
                      <span className="admin-right-header-item col-xl-3">
                        {item.name}
                      </span>
                      <span className="admin-right-header-item col-xl-3">
                        {item.token}
                      </span>
                      <span className="admin-right-header-item col-xl-1">
                        {currentValue}
                      </span>
                      <span className="admin-right-header-item col-xl-2">
                        {item.price}
                      </span>
                      <span className="admin-right-header-item col-xl-3">
                        {item.createdAt}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listHistory: state.admin.listHistory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    historyOrderUser: (id) => {
      dispatch(actions.historyOrderUser(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullListOrder);
