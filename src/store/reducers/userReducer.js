import actionTypes from "../actions/actionTypes";
import {findIndex} from "lodash";
import {toast} from "react-toastify";

const initialState = {
    userLoggedIn: false,
    userInfo: null,
    errMess: '',
    listProductInCart: [],
    numberProductInCart: 0
};

const appReducer = (state = initialState, action) => {
    let  coppyState = {...state}
    let sumValue = (list) =>{
        let currentSum = 0
        if(list && list.length> 0){
            currentSum = list.reduce((sum,item)=>{
                return sum + item.currentValue
            },0)
        }
        return currentSum
    }
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLoggedIn: true,
                userInfo: action.userInfo
            }
            case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                userLoggedIn: false,
                userInfo: null
            }
        case actionTypes.GET_USER_CURRENT:
            return{
                ...state,
                userInfo : action.user
            }
        case  actionTypes.CLEAR_LIST_CART:
            state.listProductInCart = []
            state.numberProductInCart = 0

            return {
                ...state
            }


        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        //  The 80
        case actionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
             coppyState = {...state}
            coppyState.listProductInCart.push(action.item)
            coppyState.numberProductInCart = sumValue(coppyState.listProductInCart)
            toast.success('Thêm sản phẩm thành công!!!')
            return {
                ...coppyState
            }
        case actionTypes.CHANGE_VALUE_PRODUCT_IN_CART:
             coppyState = {...state}
            coppyState.listProductInCart[action.index].currentValue += action.number
            coppyState.numberProductInCart = sumValue(coppyState.listProductInCart)
            toast.success('Thêm sản phẩm thành công!!!')
            return {
                ...coppyState
            }
        case actionTypes.CHANGE_LIST_PRODUCT:
            coppyState = {...state}
            coppyState.listProductInCart = action.list
            coppyState.numberProductInCart = sumValue(coppyState.listProductInCart)
            return{
                ...coppyState
            }
        case actionTypes.DELETE_ITEM_IN_CART:
            coppyState = {...state}
            let index = findIndex(coppyState.listProductInCart,item=>{
                return item === action.item
            })
            coppyState.listProductInCart.splice(index,1)
            coppyState.numberProductInCart = sumValue(coppyState.listProductInCart)
            toast.success('Xóa sản phẩm thành công!!!')

            return {
                ...coppyState
            }
        default:
            return state;
    }
};

export default appReducer;
