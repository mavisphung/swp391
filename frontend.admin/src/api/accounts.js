import api from './api';

const accountUrl = 'user';

// Get all accounts
export const getAccountsListData = async (page) => {
  try {
    const response = await api.get(
      `/${accountUrl}?PageNumber=${page}&PageSize=10`,
    );
    if (response.status !== 200) {
      throw new Error('Accounts list has the problem');
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
