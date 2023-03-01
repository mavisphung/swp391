import api from './api';

const productURL = 'product';
const productName = 'Search';
const productCategory = 'CategoryType';
const productStatus = 'Status';

// Get all products
export const getProductListData = async (page, name, category, status) => {
  let url = `/${productURL}?PageNumber=${page}&PageSize=10`;
  try {
    // Create url
    if (name) {
      url = `${url}&${productName}=${name}`;
    }
    if (category) {
      url = `${url}&${productCategory}=${category}`;
    }
    if (status) {
      url = `${url}&${productStatus}=${status}`;
    }

    // Call api
    const response = await api.get(`${url}`);
    if (response.status !== 200) {
      throw new Error('Product list has the problem');
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

// Get product details by id
export const getProductDetailsById = async (productId) => {
  try {
    const response = await api.get(`/${productURL}/${productId}`);
    if (response.status !== 200) {
      throw new Error('Product details by id has the problem');
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

// Add new product
export const addNewProduct = async (body) => {
  await api.post(`/${productURL}`, body);
};
