import api from './api';

const statURL = 'stats';
const city = 'cities';
const briefRecord = 'counts';
const orders = 'products';
const profit = 'profits';

// Get store brief records
export const getStoreBriefRecordsData = async () => {
  try {
    const response = await api.get(`/${statURL}/${briefRecord}`);
    if (response.status !== 200) {
      throw new Error('Store brief records has the problem');
    }
    const data = await response;
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Get all cities records
export const getCitiesRecordsData = async () => {
  try {
    const response = await api.get(`/${statURL}/${city}`);
    if (response.status !== 200) {
      throw new Error('Cities records has the problem');
    }
    const data = await response;
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Get all orders records
export const getOrdersRecordsData = async (fromDate, toDate) => {
  let url = `/${statURL}/${orders}?PageSize=20`;
  try {
    // Create url
    if (
      fromDate &&
      toDate &&
      fromDate !== 'Invalid date' &&
      toDate !== 'Invalid date'
    ) {
      url = `${url}&From=${fromDate}&To=${toDate}`;
    }

    // Call api
    const response = await api.get(`${url}`);
    if (response.status !== 200) {
      throw new Error('Orders records has the problem');
    }
    const data = await response;
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

// Get store profit records
export const getProfitRecordsData = async () => {
  try {
    const response = await api.get(`/${statURL}/${profit}?PageSize=100`);
    if (response.status !== 200) {
      throw new Error('Store profit records has the problem');
    }
    const data = await response;
    if (data) {
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};
