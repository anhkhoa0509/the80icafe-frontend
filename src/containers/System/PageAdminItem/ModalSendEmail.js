import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import CommonUtils from "../../../utils/CommonUtils";
import LoadingOverlay from 'react-loading-overlay';
import "./ModalSendEmail.scss"
import { Route,Redirect,Link } from "react-router-dom";
import { path } from "../../../utils";

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
            isLoading: false
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
        this.setState({});
    }

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

    getValueForm = async () => {
     alert('click')
    };
    // handleFile = async (e) => {
    //     let data = e.target.files;
    //     let file = data[0];
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file)
    //         let objectURL = URL.createObjectURL(file);
    //         this.setState({
    //             reviewImg: objectURL,
    //             avatar: base64
    //         });
    //     }
    // };

    render() {
        let {doctorID, paratientID, email, timeType, patientName, CurrentDate} = this.props
        return (
            <div>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    className="loading"
                    text='Đang tải dữ liệu cực mạnh, xin đừng hối. Cảm ơn!'
                >
                </LoadingOverlay>
                <Modal
                    isOpen={this.props.isOpenModal}
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
                        Xác nhận đơn hàng!
                    </ModalHeader>
                    <ModalBody>
                        Đơn hàng đã hoàn thành, Click vào xác nhận để hoàn tất!
                    </ModalBody>
                    <ModalFooter>
                    <Link to={path.FULL_LIST_ORDER}> <Button  color="primary"> 
                            Xác nhận</Button>  </Link> 
                          
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
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
