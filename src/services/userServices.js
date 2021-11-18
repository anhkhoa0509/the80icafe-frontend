import axios from "../axios";

const handleAPI = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};
const getUser = (id) => {
  return axios.post("/api/get-user", {
    id,
  });
};
const createUser = (user) => {
  return axios.post("/api/crate-user", {
    user,
  });
};

const OderConfirm = (listProduct) => {
  return axios.post("/api/add-list-product", listProduct);
};
const deleteUser = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id,
    },
  });
};

const updateUser = (user) => {
  return axios.put("/api/edit-user", {
    data: {
      user,
    },
  });
};

const verifyBooking = (data) => {
  return axios.post("/api/verify-booking", data);
};

const sendEmail = (data) => {
  return axios.post("/api/send-remedy", data);
};
const addProduct = (product) => {
  return axios.post("/api/add-product", product);
};
const getAllProduct = () => {
  return axios.get("/api/get-full-product");
};
const getAllOrder = () => {
  return axios.get("/api/get-full-booking-product");
};
const submitOrder = (id) => {
  return axios.post("/api/access-order", id);
};
const historyOrderUser = (id) => {
  return axios.post("/api/get-history-order-user", id);
};
const currentOrderUser = (id) => {
  return axios.post("/api/get-current-order-user", id);
};
export {
  addProduct,
  handleAPI,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  verifyBooking,
  sendEmail,
  getAllProduct,
  OderConfirm,
  getAllOrder,
  submitOrder,
  historyOrderUser,
  currentOrderUser,
};
