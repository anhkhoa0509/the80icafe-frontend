import React, {Component} from "react";
import {connect} from "react-redux";
import "./ItemProductInOrder.scss"



class AdminPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
           <>
           <h1>Day la Promotion</h1>
           </>

        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPromotion);
