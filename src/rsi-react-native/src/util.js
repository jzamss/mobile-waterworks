import NetInfo from "@react-native-community/netinfo";


export const isNetworkConnected = async () => {
  const state = await NetInfo.fetch()
  return state.isConnected;
}


export const mapNumber = (number, in_min, in_max, out_min, out_max) => {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
};


