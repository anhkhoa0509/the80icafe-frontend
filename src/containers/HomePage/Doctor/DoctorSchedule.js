import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./../../../store/actions";
import moment from "moment";
import "./DoctorSchedule.scss"
import NumberFormat from 'react-number-format';
import {isEmpty} from "lodash"
import ModalAddDateDoctor from "./ModalAddDateDoctor";
import Select from "react-select";

class InforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
            allTimeinDay: [],
            isOpen: false,
            nameClinic: "",
            addressClinic: "",
            noteClinic: "",
            priceEN: "",
            priceVI: "",
            payment: "",
            province: "",
            isOpenModal: false,
            currentTime: "",
            currentID: "",
            selectedOption: null,
            time: ""
        };
    }

    componentDidMount() {
        let arrDay = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            // noinspection JSValidateTypes
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM')
                obj.label = `today - ${ddMM}`
            } else {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            }
            obj.label = this.capitalizeFirstLetter(obj.label)
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDay.push(obj)
        }
        this.setState({
            arrDay
        })
    }

    handleChange = async (selectedOption) => {
        this.props.getScheduleByDate(this.props.doctorInfor.id,selectedOption.value)
        this.setState({
            selectedOption,
            time: selectedOption.value
        });

    };

    componentDidUpdate(prevProps) {
        if (this.props.listDateCurrent !== prevProps.listDateCurrent) {
            this.setState({
                allTimeinDay: this.props.listDateCurrent
            })
        }
        if (this.props.doctorInfor !== prevProps.doctorInfor) {
            let {doctorInfor} = this.props
            if (this.props.doctorInfor) {
                this.setState({
                    nameClinic: doctorInfor.nameClinic,
                    addressClinic: doctorInfor.addressClinic,
                    province: doctorInfor.provinceData.valueVI,
                    priceVI: doctorInfor.priceData.valueVI,
                    priceEN: doctorInfor.priceData.valueEN,
                    payment: doctorInfor.paymentData.valueVI,
                    noteClinic: doctorInfor.noteClinic,
                    currentID: doctorInfor.doctorID
                })
            }
        }

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleFormModal = (time) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            currentTime: time
        });
    };

    render() {
        let {arrDay, allTimeinDay, selectedOption} = this.state
        return (
            <React.Fragment>
                <ModalAddDateDoctor
                    isOpenModal={this.state.isOpenModal}
                    handleFormModal={this.handleFormModal}
                    currentTime={this.state.currentTime}
                    id={this.props.idPage}
                    timeDay={this.state.time}
                />
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={arrDay}
                    className="col-6"
                />
                <div className="col-12 full-inforDoctor-date">
                    <div className="doctor-date col-6">
                        {allTimeinDay && allTimeinDay.length > 0 ?
                            allTimeinDay.map((item, index) => {
                                return (
                                    <button key={index} className="btn btn-primary"
                                            onClick={() => this.handleFormModal(item.timeType)}>
                                        {item.timeType}
                                    </button>
                                )
                            }) : <h3>H??m nay r??nh nguy??n ng??y m???y b???n ??y</h3>
                        }
                    </div>
                    <div className="infor-clinic">
                        <div className="infor-clinic-header">
                            <p>?????A CH??? KH??M</p>
                            <p>Ph??ng kh??m Chuy??n khoa Da Li???u {this.state.nameClinic}</p>
                            <p>{this.state.addressClinic},{this.state.province}</p>
                        </div>
                        {this.state.isOpen ? <div className="infor-clinic-full">
                            <p>GI?? KH??M</p>
                            <div>
                                <span>Gi?? kh??m <br/>
                                    ???????c ??u ti??n kh??m tr?????c khi ?????t kh??m qua BookingCare
                                    . Gi?? kh??m cho ng?????i n?????c ngo??i l?? {this.state.priceEN} USD</span>
                                <p>Ng?????i b???nh c?? th??? thanh to??n chi ph?? b???ng h??nh th???c {this.state.payment}</p>
                                <span onClick={this.handleForm}>???n b???ng gi??</span>
                            </div>
                        </div> : <div className="infor-clinic-unfull">
                            <p>GI?? KH??M: <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={this.state.priceVI}
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                suffix="??"
                                isNumericString={true}/>.<span onClick={this.handleForm}>Xem chi ti???t</span></p>
                        </div>}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
        console.log('inforDoctorCurrentasddddddd', state.admin.inforDoctorCurrent)
        return {
            listDateCurrent: state.admin.listDateCurrent.data,
            doctorInfor: state.admin.inforDoctorCurrent.Doctor_InFor
        };
    }
;

const mapDispatchToProps = (dispatch) => {
        return {
            getScheduleByDate: (id, date) => {
                dispatch(actions.getScheduleByDate(id, date))
            },
            getInforDoctorCurent: (id) => {
                dispatch(actions.getInforDoctorCurent(id));
            },
        };
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(InforDoctor);
