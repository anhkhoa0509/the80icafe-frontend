/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/appActions";
import "./News.scss";
import { Link, NavLink } from "react-router-dom";
import { path } from "../../../utils";

import FiberNewIcon from "@mui/icons-material/FiberNew";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container news">
        <p className="news-header">
          <FiberNewIcon className="icon-news" />
          Tin Tức
        </p>
        <ul className="news-items col-xl-12 d-flex">
        <li className="news-item col-xl-4">
            <div className="card">
              <img
                src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/245955072_250893480329358_4002306879993363301_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5sLK29XalLUAX_a1slp&_nc_ht=scontent.fsgn5-8.fna&oh=d58554d385faeee02bdd71309081d7e4&oe=6199B4C5"
                alt=""
                className="card-img-top"
              />{" "}
              <Link to={`/home/news/${1}`} className="login">
                <div className="card-body">
                  <h5 className="card-title">
                    The 80’s cafe đã quay trở lại hoạt động rồi nè khách ơi!{" "}
                  </h5>
                  <p className="card-description">
                    Sau thời gian dài nghỉ dịch, The 80’s cafe đã quay trở lại
                    hoạt động rồi nè khách ơi!! 𝐓𝐇𝐎̛̀𝐈 𝐆𝐈𝐀𝐍 𝐊𝐇𝐀𝐈 𝐓𝐑𝐔̛𝐎̛𝐍𝐆 𝐋𝐀̣𝐈: 𝟏𝟐𝐡
                    𝐀𝐌 𝐧𝐠𝐚̀𝐲 𝟏𝟗/𝟏𝟎/𝟐𝟎𝟐𝟏.
                  </p>
                  <p className="card-next">Xem thêm...</p>
                </div>
              </Link>
            </div>
          </li>  <li className="news-item col-xl-4">
            <div className="card">
              <img
                src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/245955072_250893480329358_4002306879993363301_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5sLK29XalLUAX_a1slp&_nc_ht=scontent.fsgn5-8.fna&oh=d58554d385faeee02bdd71309081d7e4&oe=6199B4C5"
                alt=""
                className="card-img-top"
              />{" "}
              <Link to={`/home/news/${2}`} className="login">
                <div className="card-body">
                  <h5 className="card-title">
                    The 80’s cafe đã quay trở lại hoạt động rồi nè khách ơi!{" "}
                  </h5>
                  <p className="card-description">
                    Sau thời gian dài nghỉ dịch, The 80’s cafe đã quay trở lại
                    hoạt động rồi nè khách ơi!! 𝐓𝐇𝐎̛̀𝐈 𝐆𝐈𝐀𝐍 𝐊𝐇𝐀𝐈 𝐓𝐑𝐔̛𝐎̛𝐍𝐆 𝐋𝐀̣𝐈: 𝟏𝟐𝐡
                    𝐀𝐌 𝐧𝐠𝐚̀𝐲 𝟏𝟗/𝟏𝟎/𝟐𝟎𝟐𝟏.
                  </p>
                  <p className="card-next">Xem thêm...</p>
                </div>
              </Link>
            </div>
          </li>
          <li className="news-item col-xl-4">
            <div className="card">
              <img
                src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/245955072_250893480329358_4002306879993363301_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5sLK29XalLUAX_a1slp&_nc_ht=scontent.fsgn5-8.fna&oh=d58554d385faeee02bdd71309081d7e4&oe=6199B4C5"
                alt=""
                className="card-img-top"
              />{" "}
              <Link to={`/home/news/${3}`} className="login">
                <div className="card-body">
                  <h5 className="card-title">
                    The 80’s cafe đã quay trở lại hoạt động rồi nè khách ơi!{" "}
                  </h5>
                  <p className="card-description">
                    Sau thời gian dài nghỉ dịch, The 80’s cafe đã quay trở lại
                    hoạt động rồi nè khách ơi!! 𝐓𝐇𝐎̛̀𝐈 𝐆𝐈𝐀𝐍 𝐊𝐇𝐀𝐈 𝐓𝐑𝐔̛𝐎̛𝐍𝐆 𝐋𝐀̣𝐈: 𝟏𝟐𝐡
                    𝐀𝐌 𝐧𝐠𝐚̀𝐲 𝟏𝟗/𝟏𝟎/𝟐𝟎𝟐𝟏.
                  </p>
                  <p className="card-next">Xem thêm...</p>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
