import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
// utils.js or at the top of your reducer file
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
