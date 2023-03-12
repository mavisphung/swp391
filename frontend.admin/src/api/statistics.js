import api from './api';

const statURL = 'stats';
const city = 'cities';

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
