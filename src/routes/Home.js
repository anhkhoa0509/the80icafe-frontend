import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {path} from "./../utils"
class Home extends Component {

    render() {
        const { adminLoggedIn } = this.props;
        let linkToRedirect = adminLoggedIn ? '/admin/dashboard' : path.HOMEPAGE;
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        adminLoggedIn: state.admin.adminLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)