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

class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentProduct: 1,
      currentSum: 0,
      currentSize: 0,
      currentPrice: 0,
      mess: "",
      item: {},
    };
  }

  // S = -1, M = 0, L = 1
  componentDidMount() {
    // let value = this.props.products.find((item) => {
    //   return item.id === +this.props.match.params.id;
    // });
    // if(value.img){
    //   let imgBase64 = new Buffer.from(value.img,'base64').toString('binary')
    //   value.img = imgBase64
    // }
    // this.setState({
    //   curentProduct: 1,
    //   currentPrice: value.price,
    //   currentSum: value.price,
    //   currentSize: 0,
    //   mess: "",
    //   status: 0,
    //   item: value
    // });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      let value = this.props.products.find((item) => {
        return item.id === +this.props.match.params.id;
      });
      if (value.img) {
        let imgBase64 = new Buffer.from(value.img, "base64").toString("binary");
        value.img = imgBase64;
      }
      this.setState({
        curentProduct: 1,
        currentPrice: value.price,
        currentSum: value.price,
        currentSize: 0,
        mess: "",
        status: 0,
        item: value,
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
  //Thay đổi giá góc tùy theo lựa chọn size
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
  // Đầu tiên, lúc submit thì check xem cái (id, name với size) có trùng với thg nào có trong giỏ không?
  //Có, findindex tìm vị trí của nó => dựa vào số lượng sp lúc submit cộng thêm vào cái món có trong giỏ
  // Không, thêm bt

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
                <img
                  src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/245955072_250893480329358_4002306879993363301_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5sLK29XalLUAX_a1slp&_nc_ht=scontent.fsgn5-8.fna&oh=d58554d385faeee02bdd71309081d7e4&oe=6199B4C5"
                  alt=""
                  className="card-img-top"
                />
              </div>
              <div className=" card-product-right col-xl-6">
                <h3>
                  Sau thời gian dài nghỉ dịch, The 80’s cafe đã quay trở lại
                  hoạt động rồi nè khách ơi!!{" "}
                </h3>
              </div>
            </div>
            <div className="card-product-main">
              <p className="card-product-header">
                {" "}
                𝐓𝐇𝐎̛̀𝐈 𝐆𝐈𝐀𝐍 𝐊𝐇𝐀𝐈 𝐓𝐑𝐔̛𝐎̛𝐍𝐆 𝐋𝐀̣𝐈: 𝟏𝟐𝐡 𝐀𝐌 𝐧𝐠𝐚̀𝐲 𝟏𝟗/𝟏𝟎/𝟐𝟎𝟐𝟏.{" "}
              </p>
              <p>
                Như đã hứa trước đó, The 80’s icafe trở lại cùng chương trình
                quà tặng miễn phí khi mua đồ uống tại quán hoặc mang đi. Tặng
                kèm quà tặng xinh xắn cho hoá đơn bất kì từ 50k.{" "}
              </p>
              <p>
                Áp dụng cho các khách hàng đẹp trai xinh gái thực hiện đủ các
                bước sau:{" "}
              </p>
              <ul>
                <li> 👍 Like fanpage chính thức The 80’s icafe.</li>
                <li> 👌 share stt này ở chế độ công khai và tag 5 bạn bè. </li>
                <li>
                  {" "}
                  Chụp ảnh màn hình sau sau khi đã thực hiện xong gửi cho chúng
                  mình để nhận quà tặng nhaaaaaa
                </li>{" "}
                <li>
                  {" "}
                  * 𝑸𝒖𝒂̀ 𝒕𝒂̣̆𝒏𝒈: 1 sổ tay in Logo quán hoặc 1 khẩu trang in Logo
                  quán.{" "}
                </li>
              </ul>
              👍 Like fanpage chính thức The 80’s icafe.
              {/* <div className="card-product-description" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.descriptionHTML),
          }}> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
