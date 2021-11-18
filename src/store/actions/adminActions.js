import actionTypes from "./actionTypes";
import * as services from "../../services/index";
import { toast } from "react-toastify";
import { dispatch } from "../../redux";
import { type } from "jquery";

export const handleLogin = (email, password) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.handleAPI(email, password);
      if (value && value.data.errCode === 0) {
        if (+value.data.user.roleID === 0) {
          let userInfo = value.data.user;
          dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            userInfo,
          });
        }
        if (+value.data.user.roleID === 1) {
          let adminInfo = value.data.user;
          dispatch({
            type: actionTypes.ADMIN_LOGIN_SUCCESS,
            adminInfo,
          });
        }
        toast.success("Đăng nhập thành công!!!");
      } else {
        toast.warn("Email hoặc password không chính xác!!!");
      }
    } catch {
      toast.warn("Email hoặc password không chính xác!!!");
    }
  };
};
export const addUser = (user) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.createUser(user);
      let errCode = value.data.errCode;
      if (value.data && value.data.errCode === 0) {
        dispatch({
          type: actionTypes.CREATE_USER_SUCCESS,
          errCode,
        });
      } else {
        dispatch({
          type: actionTypes.CREATE_USER_FAIL,
          errCode,
        });
      }
    } catch {
      toast.warn("Thêm người dùng thất bại!!!");
    }
  };
};
export const AdminLogout = () => ({
  type: actionTypes.ADMIN_LOGOUT_SUCCESS,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const deleteUser = (userID) => {
  return async (dispatch) => {
    try {
      let value = await services.userServices.deleteUser(userID);
      toast.success("Delete User Success!!!");
      dispatch(renderAllUser());
      dispatch(deleteUserSuccess(value.data.errMess));
    } catch (e) {
      toast.warning("Delete User Fail!!!");
    }
  };
};
export const renderAllUser = () => {
  return async (dispatch) => {
    try {
      let users = await services.userServices.getUser("ALL");
      if (users && users.data) {
        dispatch(renderUserSuccess(users.data.user));
      }
    } catch (e) {
      dispatch(renderUserFail());
    }
  };
};

export const renderDoctor = () => {
  return async (dispatch) => {
    try {
      let users = await services.userServices.renderDoctor();
      if (users && users.data.data.length > 0) {
        dispatch({
          type: actionTypes.RENDER_DOCTOR_SUCCESS,
          data: users.data.data,
        });
      }
    } catch (e) {
      console.log("render Fail");
    }
  };
};
export const postInforDoctor = (userInfor) => {
  return async (dispatch) => {
    let response = await services.userServices.postInforDoctor(userInfor);
    if (response) {
      toast.success("POST USER SUCCESS");
    } else {
      toast.warning("POST USER FAIL");
    }
  };
};
export const getInforDoctorCurent = (id) => {
  return async (dispatch) => {
    let user = await services.userServices.getInforDoctor(id);
    if (user.data && user.data.data) {
      dispatch(getInforDoctorSuccess(user.data.data));
    } else {
      console.log("getInforDoctorFail");
    }
  };
};
export const getAllCodeTime = () => {
  return async (dispatch) => {
    let time = await services.userServices.getAllCode("TIME");
    if (time && time.data && time.data.data) {
      dispatch(getAllCodeTimeSuccess(time.data.data));
    }
  };
};

export const getScheduleByDate = (id, date) => {
  return async (dispatch) => {
    let res = await services.userServices.getScheduleByDate(id, date);
    console.log("day la res", res);
    if (res && res.data.errCode === 0) {
      console.log("day la data ben action", res.data);
      dispatch(getScheduleByDateSuccess(res.data));
    }
  };
};
export const getAllCodePriceClinic = () => {
  return async (dispatch) => {
    let time = await services.userServices.getAllCode("PRICE");
    if (time && time.data && time.data.data) {
      dispatch(getAllCodePriceClinicSuccess(time.data.data));
    }
  };
};
// getAllCodePaymentClinic,getAllCodeProvinceClinic

//Special creatUserSpecial
export const getAllOrder = () => {
  return async (dispatch) => {
    let res = await services.userServices.getAllOrder();
    if (res && res.data.errCode === 0) {
      dispatch({
        type: actionTypes.RENDER_ALL_BOOKING_SUCCESS,
        fullBooking: res.data.fullBooking,
      });
    }
  };
};

export const getAllCodePriceClinicSuccess = (listPrice) => ({
  type: actionTypes.GET_ALL_CODE_PRICE_PRICE_SUCCESS,
  listPrice,
});
export const getScheduleByDateSuccess = (data) => ({
  type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS,
  data,
});
export const getAllCodeTimeSuccess = (time) => ({
  type: actionTypes.GET_ALL_CODE_TIME_SUCCESS,
  time,
});
export const getInforDoctorSuccess = (doctor) => ({
  type: actionTypes.GET_INFOR_DOCTOR_SUCCESS,
  doctor,
});

export const updateUserSuccess = (errCode) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  errCode,
});

export const editUser = (user) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  user,
});

export const renderUserSuccess = (users) => ({
  type: actionTypes.RENDER_ALL_USER,
  users,
});
export const renderUserFail = () => ({
  type: actionTypes.RENDER_USER_FAIL,
});

export const creatUserSuccess = (errCode) => ({
  type: actionTypes.CREATE_NEW_USER,
  errCode,
});

export const allUser = (allUser) => ({
  type: actionTypes.RENDER_ALL_USER,
  allUser,
});
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
