import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      address: "",
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      numberPhone: "",
      roleID: "",
    };
  }

   componentDidMount() {
     this.setState({
      address: "",
      id: "",
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      numberPhone: "",
      roleID: "",
    });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      id: nextprops.data.id,
      address: nextprops.data.address,
      email: nextprops.data.email,
      firstName: nextprops.data.firstName,
      gender: nextprops.data.gender,
      lastName: nextprops.data.lastName,
      numberPhone: nextprops.data.numberPhone,
      roleID: nextprops.data.roleID,
    });
  }
  toggle = () => {
    console.log("co goi ham");
    this.props.handleFormEditModal();
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  checkValueNull = () => {
    const values = [
      "address",
      "email",
      "firstName",
      "gender",
      "lastName",
      "numberPhone",
      "roleID",
    ];
    let isValue = false;
    for (let i = 0; i < values.length; i++) {
      if (!this.state[values[i]]) {
        isValue = true;
        alert(values[i], " is null");
        break;
      }
    }
    return isValue;
  };

  getValueForm = async () => {
    let check = this.checkValueNull();
    if (!check) {
      this.props.updateUser(this.state);
      this.props.handleFormEditModal();
    }
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenEditModal}
          toggle={() => {
            this.toggle();
          }}
          className={"ModalEditUser"}
          centered
          autoFocus
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Chỉnh sửa người dùng
          </ModalHeader>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  onChange={this.onChange}
                  value={this.state.firstName}
                  name="firstName"
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  onChange={this.onChange}
                  value={this.state.lastName}
                  name="lastName"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label for="inputAddress">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputAddress"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                />
              </div>
            </div>
            <div className="form-group">
              <label for="inputCity">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                value={this.state.address}
                onChange={this.onChange}
                name="address"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputCity">Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.numberPhone}
                  id="inputCity"
                  onChange={this.onChange}
                  name="numberPhone"
                />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">SEX</label>
                <select
                  id="inputState"
                  className="form-control"
                  value={this.state.gender}
                  onChange={this.onChange}
                  name="gender"
                >
                  <option selected>Choose...</option>
                  <option value="1">Man</option>
                  <option value="0">Feman</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputState">Role</label>
                <select
                  id="inputState"
                  className="form-control"
                  value={this.state.roleID}
                  onChange={this.onChange}
                  name="roleID"
                >
                  <option selected>--Choose--</option>
                  <option value="R1">ASSMIN</option>
                  <option value="R2">Doctor</option>
                  <option value="R3">Man</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.getValueForm}>
              Xác nhận
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
