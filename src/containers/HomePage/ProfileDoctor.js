import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./../../store/actions";

class InforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctorCurrent: {},
            Markdown: {},
        };
    }

    componentDidMount() {
        this.props.getInforDoctorCurent(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.inforDoctorCurrent !== prevProps.inforDoctorCurrent) {
            this.setState({
                inforDoctorCurrent: this.props.inforDoctorCurrent,
                Markdown: this.props.inforDoctorCurrent.Markdown,
            });
        }
    }

    render() {
        const {Markdown} = this.state;
        return (
            <React.Fragment>
                <div className="doctor-header col-12 d-flex">
                    <div className="doctor-header-left col-2">
                        <img src={this.state.inforDoctorCurrent.img} alt="" />
                    </div>
                    <div className="doctor-header-right col-10">
                        <p>{Markdown.description ? Markdown.description : ""}</p>
                        <span>Giá khám: {this.props.inforDoctorCurrent.Doctor_InFor.priceData.valueEN} USD</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        inforDoctorCurrent: state.admin.inforDoctorCurrent,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInforDoctorCurent: (id) => {
            dispatch(actions.getInforDoctorCurent(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforDoctor);
