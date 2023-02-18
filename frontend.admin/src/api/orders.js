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
    //console.log(JSON.parse(response.headers['x-pagination']));
    const data = await response;
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
    const response = await api.get(`/${orderURL}/${orderId}`);
    if (response.status !== 200) {
      throw new Error('Customer order detail by order id has the problem');
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

// Update customer order status
export const updateOrder = async (orderId, body) => {
  await api.put(`/${orderURL}/${orderId}`, body);
};
