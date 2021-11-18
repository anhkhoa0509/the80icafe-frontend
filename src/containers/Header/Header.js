import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,doctorMenu } from './menuApp';
import './Header.scss';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
           menuApp: [] 
        }
    }
    componentDidMount(){
        if(this.props.userInfo) {
            if(this.props.userInfo.roleID === 'R1'){
                this.setState({
                    menuApp: adminMenu
                })
            }
            if(this.props.userInfo.roleID === 'R2'){
                this.setState({
                    menuApp: doctorMenu
                })
            }
        }
    }
    render() {
        const { processLogout, } = this.props;
       
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className = "user-name">
                    <span>{this.props.userInfo && this.props.userInfo.firstName ? this.props.userInfo.firstName : ''}</span>
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                </div>
                {/* nút logout */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
