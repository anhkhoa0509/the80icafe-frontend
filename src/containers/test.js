// https://jsbin.com/deliwe/edit?js,console,output

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";

class test extends React.Component {
    constructor(){
        super();
        this.state = {increasing: false}
    }
    update(){
        ReactDOM.render(
            <test  />,
            document.getElementById('root'))
    }
    componentWillReceiveProps(nextProps){
        this.setState({increasing: nextProps.val > this.props.val})
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 === 0;
    }
    render(){
        console.log(this.state.increasing)
        return (
            <button onClick={this.update.bind(this)}>
                {this.props.val}
            </button>
        )
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(`prevProps: ${prevProps.listproducts}`)
        console.log(`hientai: ${this.props.listproducts}`)

    }
}

test.defaultProps = {val: 0}
const mapStateToProps = (state) => {
        console.log('state.user.listProductInCart',state.user.listProductInCart)
        return {
            listproducts : state.user.listProductInCart
        };
    }
;
export default connect(mapStateToProps, null)(test)
