import actionTypes from "../actions/actionTypes";
import { findIndex } from "lodash";

const initialState = {
  userLoggedIn: false,
  adminLoggedIn: false,
  adminInfo: null,
  userInfo: null,
  listUser: [],
  errCode: "",
  errCodeEdit: "",
  listProduct: [],
  listCafe: [],
  listTea: [],
  listFood: [],
  listBooking: [],
  listHistory: [],
  listCurrentOrder: [],

  listDoctor: [],
  allCodeTime: [],
  userEdit: "",
  inforDoctorCurrent: "",
  listDateCurrent: [],
  listPrice: [],
  listPayment: [],
  listProvince: [],
  listUserBooking: [],
  isLoading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        adminLoggedIn: false,
        adminInfo: null,
      };

    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      state.listProduct = action.listProduct;
      if (action.listProduct && action.listProduct.length > 0) {
        action.listProduct.map((item) => {
          if (+item.roleID === 1) {
            let index = findIndex(state.listCafe, (itemCurrent) => {
              return itemCurrent.id === item.id;
            });
            if (index === -1) {
              state.listCafe = [...state.listCafe, item];
            }
          }
          if (+item.roleID === 2) {
            let index = findIndex(state.listTea, (itemCurrent) => {
              return itemCurrent.id === item.id;
            });
            if (index === -1) {
              state.listTea = [...state.listTea, item];
            }
          }
          if (+item.roleID === 3) {
            let index = findIndex(state.listFood, (itemCurrent) => {
              return itemCurrent.id === item.id;
            });
            if (index === -1) {
              state.listFood = [...state.listFood, item];
            }
          }
        });
      }
      return {
        ...state,
      };
    case actionTypes.RENDER_ALL_BOOKING_SUCCESS:
      state.listBooking = action.fullBooking;
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      state.errCode = action.errCode;
      return {
        ...state,
      };
    case actionTypes.GET_HISTORY_ORDER_SUCCESS:
      state.listHistory = action.listHistory;
      return {
        ...state,
      };
    case actionTypes.GET_CURRENT_ORDER_SUCCESS:
      state.listCurrentOrder = action.currentOrder;
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_FAIL:
      state.errCode = action.errCode;
      return {
        ...state,
      };
    case actionTypes.RENDER_ALL_USER:
      let copyState = { ...state };
      copyState.listUser = action.users;
      return {
        ...copyState,
      };

    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      state.errCode = action.errCode;
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_SUCCESS:
      state.userEdit = action.user;
      return {
        ...state,
      };

    case actionTypes.RENDER_DOCTOR_SUCCESS:
      state.listDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_INFOR_DOCTOR_SUCCESS:
      state.inforDoctorCurrent = action.doctor;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_CODE_TIME_SUCCESS:
      state.allCodeTime = action.time;
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS:
      state.listDateCurrent = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_CODE_PRICE_PRICE_SUCCESS:
      state.listPrice = action.listPrice;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_CODE_PAYMENT_SUCCESS:
      state.listPayment = action.listPayment;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_CODE_PROVINCE_SUCCESS:
      state.listProvince = action.listProvince;
      return {
        ...state,
      };
    case actionTypes.GET_USER_BOOKING_SUCCESS:
      state.listUserBooking = action.list;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
