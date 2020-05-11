import { getRates, fetchRates as fetchUpdatedRates } from "../../api/rate";

export const SET_RATES = "SET_RATES";

/* load rates from local database */
export const loadRates = () => {
  return async (dispatch) => {
    const rates = await getRates();
    return dispatch({ type: SET_RATES, rates });
  };
};

/* fetch updated rates from water server */
export const fetchRates = () => {
  return async (dispatch) => {
    const rates = await fetchUpdatedRates();
    return dispatch({ type: SET_RATES, rates });
  };
};