/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../../store/actions/index";
import "./FullProduct.scss";
import * as services from "../../../services";


class FullProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMess: "",
            isStatus: 0,
        };
    }
    componentDidMount  = async () =>{
        const urlParams = new URLSearchParams(this.props.location.search);
        const token = urlParams.get('token');
        const userID = urlParams.get('userID');
        let data = {
            token,userID
        }
        let value = await services.userServices.verifyBooking(data)
        if(value.data && +value.data.errCode === 0){
            this.props.getAllOrder();
            this.setState({
                isMess: 'Xác nhận đơn hàng thành công!!!',
                isStatus: 1
            });
        }
        if(value.data && +value.data.errCode === 1){
            this.setState({
                isMess: value.data.errMess
            });
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.products !== prevProps.products) {
            this.setState({
                listProduct: this.props.products,
            });
        }
    }

    // Nếu isListRender === 0 thì nối mảng cà phê food và tea thành 1 và render ra
    // Ngược lại thì sẽ render ra từng list dựa vào số 1, cà phê, 2, tea 3,



    render() {
        return (
            <div className="cart col-xl-12 d-flex cart-active ">
                <p className={this.state.isStatus === 1? "text text-active" : "text" } >{this.state.isMess}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        products: state.admin.listProduct,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrder: () => {
            dispatch(actions.getAllOrder());
          },
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullProduct);
