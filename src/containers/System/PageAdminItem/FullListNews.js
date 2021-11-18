import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as services from "../../../services/index";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();
// Finish!
// noinspection JSCheckFunctionSignatures
class FullListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      contentMarkdown: "",
      contentHTML: "",
      reviewImg: null,
      title: "",
      avatar: "",
      imgBase64 : ''
    };
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  componentDidMount() {
    this.props.getAllProduct()
  }

  componentDidUpdate(prevProps) {}

  onChangeFormInput = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        avatar: base64,
        reviewImg: objectURL,
      });
    }
  };


  changeSelect = (e) => {
    this.setState({
      roleID: e.target.value,
    });
  };
  saveForm = async () => {
    let value = await services.userServices.addProduct({
      name: this.state.name,
      descriptionHTML: this.state.contentHTML,
      descriptionMarkdown: this.state.contentMarkdown,
      img: this.state.avatar,
      roleID: this.state.roleID,
      price: this.state.price,
    });
    if (value.data && value.data.errCode === 0) {
      this.setState({
        isOpen: false,
        contentMarkdown: "",
        contentHTML: "",
        reviewImg: null,
        roleID: "",
        name: "",
        price: "",
        avatar: "",
      });
      toast.success("Thêm sản phẩm thành công!!!");
    } else {
      toast.warn("Thêm sản phẩm thành công!!!");
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.reviewImg}
            onCloseRequest={() => this.setState({ isOpen: !this.state.isOpen })}
          />
        )}
        <div className="col-xl-8">
          <p className="admin-title mt-4">Thêm bản tin</p>
          <div className="admin">
            <div className="admin-right ">
              <p className="admin-right-text">Nhập vào đây: </p>
              <form className="form-group col-xl-12">
                <div className="d-flex">
                  <div className="form-group col-xl-12">
                    <label htmlFor="exampleInputPassword1">Tiêu đề bản tin:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="title"
                      value={this.state.name}
                      onChange={this.onChangeFormInput}
                      placeholder="Nhập tiêu đề bản tin"
                      required
                    />
                  </div>
                
                </div>
                <label htmlFor="exampleInputPassword1">Nội dung bản tin:</label>
                <MdEditor
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.contentMarkdown}
                />
              </form>
              <div className={"div-btn"}>
                <button
                  type="submit"
                  className="btn btn-submit btn-primary"
                  onClick={this.saveForm}
                >
                  Lưu lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: () => {
      dispatch(actions.getAllProduct());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullListProduct);
