import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      numberPhone: "",
      password: "",
      roleID: "",
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.handleFormModal();
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
      "password",
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
     await this.props.creatUser(this.state);
     if(this.props.data.errCode ===0){
       this.props.handleFormModal()
     }
    }
    alert(this.props.data.errMess)
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"ModalUser"}
          centered
          autoFocus
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Thêm người dùng
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
                  name="firstName"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  onChange={this.onChange}
                  name="lastName"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputAddress">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputAddress"
                  onChange={this.onChange}
                  name="email"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputAddress">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputAddress"
                  onChange={this.onChange}
                  name="password"
                  placeholder="1234 Main St"
                />
              </div>
            </div>
            <div className="form-group">
              <label for="inputCity">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
