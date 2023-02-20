import api from './api';

const productURL = 'product';
const productName = 'Search';
const productCategory = 'CategoryType';

// Get all products
export const getProductListData = async (page, name, category) => {
  let url = `/${productURL}?PageNumber=${page}&PageSize=10`;
  try {
    // Create url
    if (name) {
      url = `${url}&${productName}=${name}`;
    }
    if (category) {
      url = `${url}&${productCategory}=${category}`;
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
