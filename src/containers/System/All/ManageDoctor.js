import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// noinspection JSCheckFunctionSignatures
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            userEdit: "",
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedOption: null,
            isEdit: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            nameClinic: "",
            addressClinic: "",
            noteClinic: "",
            valueCurrentPayment: null,
            valueCurrentPrice: null,
            valueCurrentProvince: null,
            doctorInfor: null,
        };
    }

    filDoctorInList = () => {
        let result = [];
        const {listUser} = this.props;
        if (listUser && listUser.length > 0) {
            // eslint-disable-next-line array-callback-return
            listUser.map((item) => {
                if (item.roleID === "R2") {
                    return result.push({
                        value: `${item.firstName} ${item.lastName}`,
                        label: `${item.firstName} ${item.lastName}`,
                        id: item.id,
                    });
                }
            });
        }
        return result;
    };

    handleChange = async (selectedOption) => {
        this.setState({selectedOption});
        await this.props.getInforDoctorCurent(selectedOption.id);
    };

    handleChangeSelectedInfor = async (selectedOption, nameInput) => {
        let copyState = {...this.state}
        let name = nameInput.name
        copyState[name] = selectedOption
        this.setState({
            ...copyState
        })
        console.log('test', selectedOption, nameInput.name)
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    componentDidMount() {
        this.props.renderAllUser()
        this.props.getAllCodePriceClinic()
        this.props.getAllCodePaymentClinic()
        this.props.getAllCodeProvinceClinic()
    }

    componentDidUpdate(prevProps) {
        if (this.props.inforDoctorCurrent !== prevProps.inforDoctorCurrent) {
            let {inforDoctorCurrent} = this.props
            if (this.props.inforDoctorCurrent)
                this.setState({
                    description: inforDoctorCurrent.description,
                    contentMarkdown: inforDoctorCurrent.contentMarkdown,
                    contentHTML: inforDoctorCurrent.contentHTML,
                    isEdit: true
                })
            else {
                this.setState({
                    contentMarkdown: "",
                    contentHTML: "",
                    description: "",
                    isEdit: false
                })
            }
        }
        if (this.props.listPrice !== prevProps.listPrice) {
            let lisPriceVI = []
            if (this.props.listPrice && this.props.listPrice.length > 0) {
                lisPriceVI = this.props.listPrice.map((item) => {
                    return {
                        label: `${item.valueVI} VND`,
                        value: item.keyMap,

                    }
                })
            }
            this.setState({
                listPrice: lisPriceVI
            })
        }
        if (this.props.listPayment !== prevProps.listPayment) {
            let lisPriceVI = []
            if (this.props.listPayment && this.props.listPayment.length > 0) {
                lisPriceVI = this.props.listPayment.map((item) => {
                    return {
                        label: item.valueVI,
                        value: item.keyMap,

                    }
                })
            }
            this.setState({
                listPayment: lisPriceVI
            })

        }
        if (this.props.listProvince !== prevProps.listProvince) {
            let lisPriceVI = []
            if (this.props.listProvince && this.props.listProvince.length > 0) {
                lisPriceVI = this.props.listProvince.map((item) => {
                    return {
                        label: item.valueVI,
                        value: item.keyMap,

                    }
                })
            }
            this.setState({
                listProvince: lisPriceVI
            })

        }

        if (this.props.doctorInfor !== prevProps.doctorInfor) {
            let {doctorInfor} = this.props
            if (this.props.doctorInfor) {
                this.setState({
                    valueCurrentPayment: {
                        label: doctorInfor.paymentData.valueVI,
                        value: doctorInfor.paymentID,
                    },
                    valueCurrentPrice: {
                        label: doctorInfor.priceData.valueVI,
                        value: doctorInfor.priceID,
                    },
                    valueCurrentProvince: {
                        label: doctorInfor.provinceData.valueVI,
                        value: doctorInfor.provinceID
                    },
                    nameClinic: doctorInfor.nameClinic,
                    addressClinic: doctorInfor.addressClinic,
                    noteClinic: doctorInfor.note,
                })
            }
        }

    }

    descriptionChange = (e) => {
        this.setState({
            description: e.target.value,
        });
    };
    handleSaveContentMarkdown = () => {
        this.props.postInforDoctor({
            contentHTML: this.state.contentHTML,
            selectedOption: this.state.selectedOption,
            description: this.state.description,
            contentMarkdown: this.state.contentMarkdown,
            doctorID: this.state.selectedOption.id,
            valueCurrentPayment: this.state.valueCurrentPayment.value,
            valueCurrentPrice: this.state.valueCurrentPrice.value,
            valueCurrentProvince: this.state.valueCurrentProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            noteClinic: this.state.noteClinic,
            isEdit: this.state.isEdit
        })


    };
    onChangeFormInput = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        const {selectedOption, listPrice, listPayment, listProvince, valueCurrentPrice} = this.state;
        return (
            <React.Fragment>
                <div className="container description-doctor">
                    <div>
                        <h1>Description for Doctor</h1>
                        <div className="top-formDoctor col-12">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.filDoctorInList()}
                                className="col-6"
                            />
                            <textarea
                                name="description"
                                onChange={this.descriptionChange}
                                value={this.state.description}
                                className="textarea-doctor"
                            />
                        </div>
                        <div className="col-12 d-flex p-2 ">
                            <div className="form-group col-4">
                                <label>Chọn giá</label>
                                <Select
                                    value={valueCurrentPrice}
                                    onChange={this.handleChangeSelectedInfor}
                                    options={listPrice}
                                    name="valueCurrentPrice"
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>Chọn phương thức thanh toán</label>
                                <Select
                                    value={this.state.valueCurrentPayment}
                                    onChange={this.handleChangeSelectedInfor}
                                    options={listPayment}
                                    name="valueCurrentPayment"
                                />
                            </div>
                            <div className="form-group col-4">
                                <label>Chọn tỉnh thành</label>
                                <Select
                                    value={this.state.valueCurrentProvince}
                                    onChange={this.handleChangeSelectedInfor}
                                    options={listProvince}
                                    name="valueCurrentProvince"
                                />
                            </div>
                        </div>
                        <div className="col-12 d-flex form-input">
                            <div className="form-group col-4">
                                <label>Tên phòng khám</label>
                                <input type="text"
                                       className="form-control"
                                       name="nameClinic"
                                       value={this.state.nameClinic}
                                       onChange={this.onChangeFormInput}
                                />

                            </div>
                            <div className="form-group col-4">
                                <label>Địa chỉ phòng khám</label>
                                <input type="text"
                                       name="addressClinic"
                                       className="form-control"
                                       value={this.state.addressClinic}
                                       onChange={this.onChangeFormInput}
                                />

                            </div>
                            <div className="form-group col-4">
                                <label>Note</label>
                                <input type="text"
                                       className="form-control"
                                       name="noteClinic"
                                       value={this.state.noteClinic}
                                       onChange={this.onChangeFormInput}
                                />
                            </div>
                        </div>
                        <MdEditor
                            style={{height: "500px"}}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                        <button
                            className={this.state.isEdit ? "btn btn-primary" : "btn btn-success"}
                            onClick={this.handleSaveContentMarkdown}
                        >
                            {this.state.isEdit ? 'Edit' : 'Save all'}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUser: state.admin.listUser,
        newUser: state.admin.newUser,
        inforDoctorCurrent: state.admin.inforDoctorCurrent.Markdown,
        doctorInfor: state.admin.inforDoctorCurrent.Doctor_InFor,
        listPrice: state.admin.listPrice,
        listPayment: state.admin.listPayment,
        listProvince: state.admin.listProvince

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderAllUser: () => {
            dispatch(actions.renderAllUser());
        },
        postInforDoctor: (inforDoctor) => {
            dispatch(actions.postInforDoctor(inforDoctor));
        },
        getInforDoctorCurent: (id) => {
            dispatch(actions.getInforDoctorCurent(id));
        },
        getAllCodePriceClinic: () => {
            dispatch(actions.getAllCodePriceClinic())
        },
        getAllCodePaymentClinic: () => {
            dispatch(actions.getAllCodePaymentClinic())
        },
        getAllCodeProvinceClinic: () => {
            dispatch(actions.getAllCodeProvinceClinic())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
