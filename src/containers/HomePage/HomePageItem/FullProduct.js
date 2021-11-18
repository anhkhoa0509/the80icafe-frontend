/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./FullProduct.scss";
import ProductCafe from "./ProductCafe";
import ProductFood from "./ProductFood";
import ProductTea from "./ProductTea";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChangeProductRender from "./ChangeProductRender";
import { findIndex } from "lodash";

class FullProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: 0,
      isListRender: 2,
      listProduct: [],
      listCafe: [],
      listTea: [],
      listFood: [],
    };
  }
  onClick = (number) => {
    if (this.state.isActive === +number) {
      this.setState({
        isActive: 0,
      });
    } else {
      this.setState({
        isActive: +number,
      });
    }
  };

  componentDidMount = async () => {
    await this.props.getAllProduct();
    this.setState({
      listProduct: this.props.products,
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.setState({
        listProduct: this.props.products,
      });
    }
  }

  // Nếu isListRender === 0 thì nối mảng cà phê food và tea thành 1 và render ra
  // Ngược lại thì sẽ render ra từng list dựa vào số 1, cà phê, 2, tea 3,
  renderList = () => {
    let { listCafe, listTea, listFood } = this.state;
    if (this.state.isListRender === 0) {
      return (
        <>
          <ProductCafe listCafe={listCafe} />
          <ProductTea listTea={listTea} />
          <ProductFood listFood={listFood} />
        </>
      );
    }
    if (this.state.isListRender === 1) {
      return <ProductCafe listCafe={listCafe} />;
    }
    if (this.state.isListRender === 2) {
      return <ProductTea listTea={listTea} />;
    }
    if (this.state.isListRender === 3) {
      return <ProductFood listFood={listFood} />;
    }
  };
  changeValue = (number) => {
    this.setState({
      isListRender: number,
    });
  };

  render() {
    return (
      <div className="full-product ">
        <ChangeProductRender changeValue={this.changeValue} />
        {this.renderList()}
        <div className="add-list">
          <span>
            Xem tất cả <KeyboardArrowRightIcon />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("products", state.admin.listProduct);
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    products: state.admin.listProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: () => {
      dispatch(actions.getAllProduct());
    },
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullProduct);
