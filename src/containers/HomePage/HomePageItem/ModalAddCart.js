/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./ModalAddCart.scss"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import * as actions from "../../../store/actions";
import {findIndex} from "lodash"
import original from "original";

class ProductCafe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curentProduct: 1,
            currentSum: 0,
            currentSize: 0,
            currentPrice: 0,
            mess: ''
        };
    }

    // S = -1, M = 0, L = 1
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            
            this.setState({
                curentProduct: 1,
                currentPrice: this.props.item.price,
                currentSum: this.props.item.price,
                currentSize: 0,
                mess: '',
                status: 0,
                imgBase64 :new Buffer.from(this.props.item.img,'base64').toString('binary')
            })
        }
    }

    toggle = () => {
        this.props.handleFormModal();
    };
    handleValue = (type) => {
        let copyState = {...this.state}
        if (type === 'add') {
            copyState.curentProduct++
            copyState.currentSum = copyState.currentSum + copyState.currentPrice
        } else {
            if (copyState.curentProduct > 1) {
                copyState.curentProduct--
                copyState.currentSum = copyState.currentSum - copyState.currentPrice
            }
        }
        this.setState({
            curentProduct: copyState.curentProduct,
            currentSum: copyState.currentSum
        })
    }
    //Thay đổi giá góc tùy theo lựa chọn size
    handleSize = (e) => {
        let setSize = 0
        let deviated = 1
        let currentValue = 0
        let valuePrice = this.state.currentPrice
        if (+e.target.value !== this.state.currentSize) {
            deviated = Math.abs(+e.target.value - this.state.currentSize)
            if (+e.target.value === -1 && (+e.target.value < this.state.currentSize)) {
                currentValue -= 5000 * deviated
                valuePrice += currentValue
                setSize = -1
            }
            if (+e.target.value === 1 && (+e.target.value > this.state.currentSize)) {
                deviated = Math.abs(+e.target.value - this.state.currentSize)
                currentValue += 5000 * deviated

                valuePrice += currentValue
                setSize = 1
            }
            if (+e.target.value === 0) {
                if (+e.target.value < this.state.currentSize) {
                    currentValue -= 5000 * deviated
                    valuePrice += currentValue
                }
                if (+e.target.value > this.state.currentSize) {
                    currentValue += 5000 * deviated
                    valuePrice += currentValue
                }
                setSize = 0
            }
        }
        let sum = valuePrice * this.state.curentProduct
        this.setState({
            currentSize: setSize,
            currentSum: sum,
            currentPrice: valuePrice
        })
    }


    handleInput = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }
    // Đầu tiên, lúc submit thì check xem cái (id, name với size) có trùng với thg nào có trong giỏ không?
    //Có, findindex tìm vị trí của nó => dựa vào số lượng sp lúc submit cộng thêm vào cái món có trong giỏ
    // Không, thêm bt

    getValueForm = () => {
        let {listproducts} = this.props
        let obj = {
            id: this.props.item.id,
            name: this.props.item.name,
            currentValue: this.state.curentProduct,
            size: this.state.currentSize,
            price: this.state.currentPrice,
            mess: this.state.mess,
        }
        if (listproducts && listproducts.length > 0) {
            let value = findIndex(listproducts, (item) => {
                return (item.id === this.props.item.id && item.name === this.props.item.name
                    && item.size === this.state.currentSize)
            })
            if (value === -1) {
                this.props.addProductToCart(obj)
            }else{
                this.props.changeValueProductInCart(value,this.state.curentProduct)
            }
        }
        else{
            this.props.addProductToCart(obj)
        }
        this.props.handleFormModal();
        this.setState({
            curentProduct: 1,
            currentSum: this.props.item.price,
            currentSize: 0,
            currentPrice: this.props.item.price,
            mess: ''
        })
    }


    render() {
        let {item} = this.props
        let {currentSize} = this.state
        return (
            <div className="ModalProduct">
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => {
                        this.toggle();
                    }}
                    className={"ModalProductCart"}
                    centered
                    autoFocus
                    size="xs"
                >
                    <ModalHeader
                        toggle={() => {
                            this.toggle();
                        }}
                    >
                        Thêm sản phẩm vào giỏ
                    </ModalHeader>
                    <ModalBody>
                        <div className="card-product ">
                            <img src={this.state.imgBase64} alt="" className="card-img-top-product "/>
                            <div className="card-body-product ">
                                <h5 className="card-title-product">{item.name}</h5>
                                <div className="gr-icon-change">
                                    <RemoveCircleIcon className={this.state.curentProduct <= 1 ? "icon-change icon-disabled " : "icon-change"}
                                                      onClick={() => this.handleValue('remove')}/>
                                    <span
                                        className="current-value">{this.state.curentProduct < 10 ? `0${this.state.curentProduct}` : this.state.curentProduct}</span>
                                    <AddCircleIcon className="icon-change" onClick={() => this.handleValue('add')}/>
                                </div>
                                <span className="change-size-text">Chọn Size:</span>
                                <div className="change-size d-flex" onChange={this.handleSize}>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="customRadio1"
                                               name={"currentSize"}
                                               value={-1}
                                               checked={currentSize === -1}
                                               className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor="customRadio1">Nhỏ</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="customRadio2"
                                               name={"currentSize"}
                                               value={0}
                                               checked={currentSize === 0}
                                               className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor="customRadio2">Vừa</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="customRadio3"
                                               name={"currentSize"}
                                               value={1}
                                               checked={currentSize === 1}
                                               className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor="customRadio3">Lớn</label>
                                    </div>
                                </div>
                                <p className="card-price-product">Tổng: {this.state.currentSum} VND</p>
                            </div>
                        </div>
                        <div className="mess">
                            <p>Lời nhắn :</p>
                            <textarea className="form-control mess" id="exampleFormControlTextarea1" rows="2"
                                      name="mess" onChange={this.handleInput}
                                      placeholder="Hãy nhắn gửi yêu thương với người sẽ làm ly nước này cho bạn nhé :v"/>
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
            started: state.app.started,
            isLoggedIn: state.user.isLoggedIn,
            language: state.app.language,
            listproducts: state.user.listProductInCart

        };
    }
;

const mapDispatchToProps = (dispatch) => {
        return {
            addProductToCart: (item) => {
                dispatch(actions.addProductToCart(item))
            },
            changeValueProductInCart : (index,number) =>{
                dispatch(actions.changeValueProductInCart(index,number))
            }
        };
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(ProductCafe);
