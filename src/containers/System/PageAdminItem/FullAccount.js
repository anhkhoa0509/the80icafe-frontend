import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./FullAccount.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as services from "../../../services/index";

// Finish!
// noinspection JSCheckFunctionSignatures
class FullAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      userEdit: "",
      selectedOption: null,
      isEdit: "",
      fullname : "",
      email: "",
      address: "",
      numberPhone: "",
      password: "",
      isEye: false
    };
  }

  filDoctorInList = () => {
    let result = [];
    const { listUser } = this.props;
    if (listUser && listUser.length > 0) {
      // eslint-disable-next-line array-callback-return
      listUser.map((item) => {
        return result.push({
          value: item.email,
          label: item.email,
          id: item.id,
        });
      });
    }
    return result;
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let value = this.state.listUser.find((item) => {
      return item.id === selectedOption.id;
    });
    this.setState({
      userEdit: value,
      fullname : value.fullname,
      email: value.email,
      address: value.address,
      numberPhone: value.numberPhone,
      password: value.password,
    });
  };

  handleChangeSelectedInfor = async (selectedOption, nameInput) => {
    let copyState = { ...this.state };
    let name = nameInput.name;
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };

  componentDidMount() {
    this.props.renderAllUser();
    if (this.props.listUser && this.props.listUser.length > 0) {
      this.setState({
        listUser: this.props.listUser,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.listUser !== prevProps.listUser) {
        this.setState({
            listUser: this.props.listUser,
          });
    }
    if(this.props.errCodeEdit !== prevProps.errCodeEdit){
        this.setState({
            isEdit: this.props.errCodeEdit
        })
    }
  }
  handleInput = (e) =>{
    let target = e.target
    let name = target.name
    let value = target.value
    this.setState({
        [name]: value
    })
  }
  onChangeFormInput = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };


  DeleteUser = async (e) => {
      e.preventDefault();
      let value = await services.userServices.deleteUser(this.state.userEdit.id);
      if(value.data && value.data.mess.errCode === 0){
        await this.props.renderAllUser()
        toast.success("Xoá người dùng thành công!!!")
          this.setState({
              userEdit: "",
              selectedOption: null,
              fullname : "",
              email: "",
              address: "",
              numberPhone: "",
              password: "",
          })
      }  else{
        toast.warn("Xóa người dùng không thành công!!!")
      }
     
  };
  EditUser = async (e) =>{
    e.preventDefault();
    let value = await services.userServices.updateUser({
      fullname : this.state.fullname,
      email: this.state.email,
      address: this.state.address,
      numberPhone: this.state.numberPhone,
      password: this.state.password,
      id: this.state.userEdit.id
  });
  if(value.data && value.data.errCode === 0){
      await this.props.renderAllUser()
      toast.success("Cập nhật người dùng thành công!!!")
        this.setState({
            userEdit: "",
            selectedOption: null,
            fullname : "",
            email: "",
            address: "",
            numberPhone: "",
            password: "",
        })
    }
    else{
      toast.warn("Cập nhật người dùng không thành công!!!")
    }
  }
  isEye = () =>{
    this.setState({
      isEye: !this.state.isEye
    })
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
        <div className="container description-doctor">
          <div>
            <p className="admin-title mt-4">Danh sách tài khoản</p>

            <div className="admin">
              <div className="admin-right ">
                <p className="admin-right-text">Chọn người dùng: </p>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={this.filDoctorInList()}
                  className="col-12"
                />
                <form onSubmit={this.SubmitDK} noValidate>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tên:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="fullname"
                      value={this.state.fullname}
                      onChange={this.handleInput}
                      placeholder="Vui lòng nhập tên của bạn"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInput}
                      aria-describedby="emailHelp"
                      placeholder="Vui lòng nhập nhập email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Mật khẩu:</label>
                    <input
                      type= {this.state.isEye ? "text" : "password"}
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInput}
                      placeholder="Vui lòng nhập mật khẩu"
                      required
                    ></input>
                    {this.state.isEye ? <VisibilityOffIcon className = "eye" onClick={this.isEye}/>: <VisibilityIcon VisibilityOffIcon className = "eye" onClick={this.isEye}/>   }
                    
                   
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPhone">
                      Số điện thoại liên hệ:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      name="numberPhone"
                      value={this.state.numberPhone}
                      onChange={this.handleInput}
                      aria-describedby="emailHelp"
                      placeholder="Vui lòng nhập số điện thoại"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleInput}
                      aria-describedby="emailHelp"
                      placeholder="Vui lòng nhập địa chỉ"
                      required
                    />
                  </div>
                  <div className={"div-btn btn-handle"}>
                    <button
                      type="submit"
                      className="btn btn-submit btn-danger"
                      onClick={this.DeleteUser}
                    >
                      Xóa người dùng
                    </button>
                    <button
                      type="submit"
                      className="btn btn-submit btn-primary"
                      onClick={this.EditUser}
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.listUser,
    errCodeEdit: state.admin.errCodeEdit
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    renderAllUser: () => {
      dispatch(actions.renderAllUser());
    },
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullAccount);
