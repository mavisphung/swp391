import api from './api';

const orderURL = 'order';
const status = 'OrderStatus';
const id = 'orderId';

// Get all customer orders
export const getCustomerOrderListData = async (page) => {
  try {
    const response = await api.get(
      `/${orderURL}?PageNumber=${page}&PageSize=10`,
    );
    if (response.status !== 200) {
      throw new Error('Customer order list has the problem');
    }
    const data = await response.data;
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Get customer orders list with filters
export const getFilterCustomerOrderListData = async (
  page,
  statusId,
  orderId,
) => {
  let url = `/${orderURL}?PageNumber=${page}&PageSize=10`;
  try {
    // Create url
    if (statusId) {
      url = `${url}&${status}=${statusId}`;
    }
    if (orderId) {
      url = `${url}&${id}=${orderId}`;
    }

    // Call api
    console.log('Url:', url);
    const response = await api.get(`${url}`);
    if (response.status !== 200) {
      throw new Error('Filtered customer orders list has the problem');
    }
    const data = await response.data;
    console.log('api:', data);
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Get customer order detail by order id
export const getCustomerOrderDetailDataByOrderId = async (orderId) => {
  try {
    const response = await api.get(
      `${orderURL}?${id}=${orderId}&includeProperties=CustomerOrderDetails,CustomerAccount`,
    );
    if (response.status !== 200) {
      throw new Error('Customer order detail by order id has the problem');
    }
    const data = await response.data;
    if (data) {
      return data.data[0];
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Deny customer order
export const denyOrder = async (order) => {
  await api.put(`${orderURL}/customer-order-deny`, order);
};

// Approve customer order
export const approveOrder = async (order) => {
  await api.put(`${orderURL}/customer-order-approve`, order);
};
