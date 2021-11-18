import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../HomePage/HomeHeader"
import * as services from "../../../services";
import {verifyBooking} from "../../../services/userServices";


// Finish!
class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    async componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const token = urlParams.get('token');
        const doctorID = urlParams.get('doctorID');
        let value = await services.userServices.verifyBooking({token, doctorID})
        console.log('valueeeee',value.data)
        if(value.data && value.data.errCode === 0){
            this.setState({
                message: 'Booking Thành công'
            })
        }else{
            this.setState({
                message: 'Đơn hàng không tồn tại hoặc đã được xác nhận'
            })
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="container mt-5">
                    <h1>{this.state.message}</h1>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
