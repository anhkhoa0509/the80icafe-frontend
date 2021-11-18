import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DoctorSchedule from "../containers/System/Doctor/Doctor-Schedule";
import Header from "../containers/Header/Header";
import ManagePatient from"../containers/System/Doctor/ManagePatient";
class ManageDoctor extends Component {
  render() {

    return (
      <React.Fragment>
        {this.props.isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/doctor/manage-doctor" component={DoctorSchedule} />
            <Route path="/doctor/manage-patient" component={ManagePatient} />
          </Switch>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
