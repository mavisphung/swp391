import api from './api';

const categoryURL = 'category';
const categoryName = 'Search';
const id = 'categoryId';

// Get all categories
export const getCategoriesListData = async (page, pageSize, name) => {
  let url = `/${categoryURL}?PageNumber=${page}&PageSize=${pageSize}`;
  try {
    // Create url
    if (name) {
      url = `${url}&${categoryName}=${name}`;
    }

    // Call api
    const response = await api.get(`${url}`);
    if (response.status !== 200) {
      throw new Error('Categories list has the problem');
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

// Add new category
export const addCategory = async (body) => {
  await api.post(`/${categoryURL}`, body);
};

// Update category
export const updateCategoryById = async (categoryId, body) => {
  await api.put(`/${categoryURL}/${categoryId}`, body);
};

// Get category by id
export const getCategoryDataById = async (categoryId) => {
  try {
    const response = await api.get(`/${categoryURL}/${categoryId}`);
    if (response.status !== 200) {
      throw new Error('Category by id has the problem');
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
