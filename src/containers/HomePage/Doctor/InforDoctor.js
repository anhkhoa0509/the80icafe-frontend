import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./../../../store/actions";
import Header from "./../HomeHeader";
import "./InforDoctor.scss";
import DOMPurify from "dompurify";
import DoctorSchedule from "./DoctorSchedule";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";

class InforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: {},
            Markdown: {},
        };
    }

    componentDidMount() {
        this.props.getInforDoctorCurent(this.props.match.params.id);
        if (this.props.inforDoctorCurrent) {
            this.setState({
                inforDoctor: this.props.inforDoctorCurrent,
                Markdown: this.props.inforDoctorCurrent.Markdown,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.inforDoctorCurrent !== prevProps.inforDoctorCurrent) {
            this.setState({
                inforDoctor: this.props.inforDoctorCurrent,
                Markdown: this.props.inforDoctorCurrent.Markdown,
            });
        }
    }

    render() {
        const {Markdown} = this.state;
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Header isBanner={false}/>
                    <div className="top">
                        <div className="doctor-header col-12 d-flex">
                            <div className="doctor-header-left col-2">
                                <img src={this.state.inforDoctor.img} alt=""/>
                            </div>
                            <div className="doctor-header-right col-0">
                                <span>{Markdown.description ? Markdown.description : ""}</span>
                                <div className="like-share-plugin">
                                    <LikeAndShare
                                        link="http://localhost:6969/infor-doctor/2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <DoctorSchedule idPage={this.props.match.params.id}/>
                        </div>
                        <div
                            className="col-12 mt-4"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(Markdown.contentHTML),
                            }}
                        />
                    </div>
                </div>
                    <div className="col-12 ">
                        <Comment/>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
