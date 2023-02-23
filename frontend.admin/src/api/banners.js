import api from './api';

const bannerURL = 'banner';

// Get all banners
export const getBannersListData = async (page) => {
  let url = `/${bannerURL}?PageNumber=${page}&PageSize=5`;
  try {
    // Call api
    const response = await api.get(`${url}`);
    if (response.status !== 200) {
      throw new Error('Banners list has the problem');
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

// Add new banner
export const addBanner = async (body) => {
  await api.post(`/${bannerURL}`, body);
};

// Remove banner
export const removeBanner = async (bannerId) => {
  await api.delete(`/${bannerURL}/${bannerId}`);
};
