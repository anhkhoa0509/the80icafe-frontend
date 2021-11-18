import React, { Component } from "react";
import "./Footer.scss";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <h5 className="footer-header">Liên hệ với chúng tôi tại:</h5>
          <div className="footer-body">
          <span>
            Địa chỉ: The 80's icafe, 6 Đ. Mạc Thiên Tích, Xuân Khánh, Ninh Kiều,
            Cần Thơ
          </span>
          <span>
            Số điện thoại liên hệ đặt hàng: <a href="0794231837" alt="sdt">0794231837</a>{" "}
          </span>
          <span>Email: the80sicafe@gmail.com</span>
          <span>Facebook: <a href = "https://www.facebook.com/the80sicafe" alt="Facebook">The80sicafe</a></span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
