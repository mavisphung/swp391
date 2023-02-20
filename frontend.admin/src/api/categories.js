import api from './api';

const categoryURL = 'category';
const id = 'categoryId';

// Get all categories
export const getCategoriesListData = async (page) => {
  try {
    const response = await api.get(
      `/${categoryURL}?PageNumber=${page}&PageSize=10`,
    );
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
