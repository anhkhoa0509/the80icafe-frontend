import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import moment from "moment";
import * as services from "./../../../services/index";


class ModalAddDateDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            email: "",
            allname: "",
            reason: "",
            numberPhone: "",
            isOpenModal: true,
            nameDoctor: {}
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        let {inforDoctor} = this.props
        if (this.props.inforDoctor !== prevProps.inforDoctor) {
            let fistName = this.props.inforDoctor.firstName
            let lastName = this.props.inforDoctor.lastName
            if(inforDoctor){
                this.setState({
                    nameDoctor: `${fistName} ${lastName}`
                })
            }
        }
    }

    toggle = () => {
        this.props.handleFormModal()
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
            "allname",
            "reason",
            "numberPhone",
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
            await services.userServices.bookDoctor({
                doctorID: this.props.id,
                email: this.state.email,
                timeType: this.props.currentTime,
                date: this.props.timeDay,
                name : this.state.nameDoctor,
                allname: this.state.allname,
                address: this.state.address,

            });
            this.props.handleFormModal()
        }
    };

    renderTimeBooking = (dateTime) => {
        if (dateTime) {
            let date = moment.unix(dateTime / 1000).format('dddd - DD/MM/YYYY')
            return (
                <div>
                    <div>{this.props.currentTime} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </div>
            )
        }
    }

    render() {
        let {timeDay} = this.props
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpenModal}
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
                        Đặt lịch khám bệnh
                    </ModalHeader>
                    <ModalBody>
                        <ProfileDoctor id={this.props.id}/>
                        {this.renderTimeBooking(this.props.timeDay)}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label form="inputEmail4">Tên đầy đủ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputEmail4"
                                    onChange={this.onChange}
                                    name="allname"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label form="inputPassword4">Nguyên nhân khám</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPassword4"
                                    onChange={this.onChange}
                                    name="reason"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label form="inputAddress">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    onChange={this.onChange}
                                    name="email"
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <label form="inputCity">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                onChange={this.onChange}
                                name="address"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label form="inputCity">NumberPhone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                    onChange={this.onChange}
                                    name="numberPhone"
                                />
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
    return {
        inforDoctor: state.admin.inforDoctorCurrent,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDateDoctor);
