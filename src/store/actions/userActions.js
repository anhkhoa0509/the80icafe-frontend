import actionTypes from "./actionTypes";
import * as services from "../../services/index";
import { toast } from "react-toastify";

export const addProductToCart = (item) => ({
  type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
  item,
});
export const getUserCurrent = (id) => {
  return async (dispatch) => {
    try {
      let users = await services.userServices.getUser(id);
      if (users && users.data) {
        dispatch({
          type: actionTypes.GET_USER_CURRENT,
          user: users.data.user,
        });
      }
    } catch (e) {
      // dispatch(renderUserFail());
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.updateUser({
        fullname: user.name,
        address: user.address,
        numberPhone: user.numberPhone,
        id: user.id,
      });
      if (value.data && value.data.errCode === 0) {
        toast.success("Cập nhật người dùng thành công!!!");
        dispatch(getUserCurrent(user.id));
      } else {
        toast.warn("Cập nhật người dùng không thành công!!!");
      }
    } catch (e) {
      toast.warn("Cập nhật người dùng không thành công!!!");
    }
  };
};

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.getAllProduct();
      if (value.data && value.data.errCode === 0) {
        let listProduct = value.data.value;
        dispatch({
          type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
          listProduct,
        });
      }
    } catch {}
  };
};
export const historyOrderUser = (userID) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.historyOrderUser(userID);
      if (value.data && value.data.errCode === 0) {
        dispatch({
          type: actionTypes.GET_HISTORY_ORDER_SUCCESS,
          listHistory: value.data.listHistory,
        });
      }
    } catch {
      console.log("historyOrderUser err");
    }
  };
};
export const currentOrderUser = (userID) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.currentOrderUser(userID);
      if (value.data && value.data.errCode === 0) {
        console.log(
          "value------------------------------",
          value.data.listHistory
        );
        dispatch({
          type: actionTypes.GET_CURRENT_ORDER_SUCCESS,
          currentOrder: value.data.listHistory,
        });
      }
    } catch {
      console.log("currentOrderUser err");
    }
  };
};

export const clearListCart = () => ({
  type: actionTypes.CLEAR_LIST_CART,
});
export const userLogout = () => ({
  type: actionTypes.USER_LOGOUT_SUCCESS,
});
export const changeValueProductInCart = (index, number) => ({
  type: actionTypes.CHANGE_VALUE_PRODUCT_IN_CART,
  index,
  number,
});
export const changeListProduct = (list) => ({
  type: actionTypes.CHANGE_LIST_PRODUCT,
  list,
});
export const deleteItemInCart = (item) => ({
  type: actionTypes.DELETE_ITEM_IN_CART,
  item,
});

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfor) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfor,
});
