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
                            }) : <h3>Hôm nay rãnh nguyên ngày mấy bạn êy</h3>
                        }
                    </div>
                    <div className="infor-clinic">
                        <div className="infor-clinic-header">
                            <p>ĐỊA CHỈ KHÁM</p>
                            <p>Phòng khám Chuyên khoa Da Liễu {this.state.nameClinic}</p>
                            <p>{this.state.addressClinic},{this.state.province}</p>
                        </div>
                        {this.state.isOpen ? <div className="infor-clinic-full">
                            <p>GIÁ KHÁM</p>
                            <div>
                                <span>Giá khám <br/>
                                    Được ưu tiên khám trước khi đật khám qua BookingCare
                                    . Giá khám cho người nước ngoài là {this.state.priceEN} USD</span>
                                <p>Người bệnh có thể thanh toán chi phí bằng hình thức {this.state.payment}</p>
                                <span onClick={this.handleForm}>Ẩn bảng giá</span>
                            </div>
                        </div> : <div className="infor-clinic-unfull">
                            <p>GIÁ KHÁM: <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={this.state.priceVI}
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                suffix="đ"
                                isNumericString={true}/>.<span onClick={this.handleForm}>Xem chi tiết</span></p>
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
