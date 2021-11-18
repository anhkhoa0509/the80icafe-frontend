import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import $ from "jquery";
import * as services from "../../../services";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";


class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      isOpenModal: false,
      isOpenEditModal: false,
      data: "",
      userEdit: "",
    };
  }

  async componentDidMount() {
    let users = await services.userServices.getUser("ALL");
    if (users.data) {
      this.setState({
        listUser: users.data.user,
      });
    }
  }

  isOpenFormModel = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  isOpenModalEdit = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };

  handleFormModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  handleFormEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };
  renderCurrentList = async () => {
    console.log('re-render')
    let users = await services.userServices.getUser("ALL");
    this.setState({
      listUser: users.data.user,
    });
  };
  creatUser = async (user) => {
    var value = await services.userServices.createUser(user);
    this.renderCurrentList();
    this.setState({
      isOpenModal: true,
      data: value.data,
    });
  };

  updateUser = async (user) => {
    await services.userServices.updateUser(user);
    this.renderCurrentList();
  }

  deleteUser = async (id) => {
    let mess = await services.userServices.deleteUser(id);
    alert(mess.data.mess.mess);
    this.renderCurrentList();
  };


  renderListUser = (users) => {
    let result = [];
    if (users) {
      result = this.state.listUser.map((user, index) => {
        return (
          <div class="table-row">
            <div class="table-data">{user.id}</div>
            <div class="table-data">{user.email}</div>
            <div class="table-data">{user.lastName}</div>
            <div class="table-data">{user.address}</div>
            <div class="table-data">{user.roleID}</div>
            <div class="table-data">
              <button
                type="button"
                class="btn btn-warning"
                onClick={() => this.isOpenModalEdit(user)}
              >
                Sửa
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => this.deleteUser(user.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        );
      });
    }
    return result;
  };
  render() {
    return (
        <React.Fragment>
      <div className="container">
        <div>
          <button
            className="btn btn-success btn-create"
            onClick={this.isOpenFormModel}
          >
            <i class="fas fa-plus icon-plus"></i>Create User
          </button>
        </div>
        <ModalUser
          isOpen={this.state.isOpenModal}
          creatUser={this.creatUser}
          data = {this.state.data}
          handleFormModal={this.handleFormModal}
        />
        <ModalEditUser
          isOpenEditModal={this.state.isOpenEditModal}
          handleFormEditModal={this.handleFormEditModal}
          data={this.state.userEdit}
          updateUser = {this.updateUser}
        />
        <div className="table">
          <div className="table-header">
            <div className="header__item">
              <a
                id="name"
                className="filter__link filter__link--number"
                href="#"
              >
                ID
              </a>
            </div>
            <div className="header__item">
              <a id="wins" className="filter__link " href="#">
                Email
              </a>
            </div>
            <div className="header__item">
              <a id="draws" className="filter__link " href="#">
                Last Name
              </a>
            </div>
            <div className="header__item">
              <a id="total" className="filter__link " href="#">
                Address
              </a>
            </div>
            <div className="header__item">
              <a id="losses" className="filter__link " href="#">
                RoleID
              </a>
            </div>
          </div>
          <div className="table-content">
            {this.renderListUser(this.state.listUser)}
          </div>
        </div>
      </div></React.Fragment>
    );
  }
}
$(function () {
  var properties = ["name", "wins", "draws", "losses", "total"];

  $.each(properties, function (i, val) {
    var orderClass = "";

    $("#" + val).click(function (e) {
      e.preventDefault();
      $(".filter__link.filter__link--active")
        .not(this)
        .removeClass("filter__link--active");
      $(this).toggleClass("filter__link--active");
      $(".filter__link").removeClass("asc desc");

      if (orderClass =="desc" || orderClass =="") {
        $(this).addClass("asc");
        orderClass = "asc";
      } else {
        $(this).addClass("desc");
        orderClass = "desc";
      }

      var parent = $(this).closest(".header__item");
      var index = $(".header__item").index(parent);
      var $table = $(".table-content");
      var rows = $table.find(".table-row").get();
      var isSelected = $(this).hasClass("filter__link--active");
      var isNumber = $(this).hasClass("filter__link--number");

      rows.sort(function (a, b) {
        var x = $(a).find(".table-data").eq(index).text();
        var y = $(b).find(".table-data").eq(index).text();

        if (isNumber ==true) {
          if (isSelected) {
            return x - y;
          } else {
            return y - x;
          }
        } else {
          if (isSelected) {
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          } else {
            if (x > y) return -1;
            if (x < y) return 1;
            return 0;
          }
        }
      });

      $.each(rows, function (index, row) {
        $table.append(row);
      });

      return false;
    });
  });
});

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
