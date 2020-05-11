import * as db from "../rsi/db";
import Rate from "../models/Rate";

const schema = "rate";

import { DUMMY_RATES } from "./dummy-data/rate";

/* load rates from local db */
export const getRates = async () => {
  const params = { schema, orderBy: "salience" };
  return await db.getList(params);
};

//TODO: simulated only
//fetch updated rates from water server
export const fetchRates = async () => {
  const rates = [];

  try {
    const rateList = await fetchUpdateRates();
    rateList.forEach((item) => {
      rates.push(db.createEntity(Rate, item));
    });

    await saveRates(rates);
    return rates;
  } catch (err) {
    console.log("fetchRates [ERROR]", err);
    throw err;
  }
};

const saveRates = async (rates) => {
  //clear all rates
  const params = { schema };
  await db.remove(params);
  
  const promises = [];
  rates.forEach((rate) => {
    promises.push(db.insert(params, rate));
  });

  Promise.all(promises)
    .then(() => {
      if (__DEV__) {
        console.log("Rates successfully committed.");
      }
    })
    .catch((err) => {
      if (__DEV__) {
        rates = [];
        console.log("SaveRates [ERROR]", err);
        throw err;
      }
    });
};

const fetchUpdateRates = async () => {
  const fetchServerRates = new Promise((resolve, reject) => {
    setTimeout(() => {
      //TODO
      //this should resolve to a list of objects
      const list = DUMMY_RATES;
      resolve(list);
    }, 500);
  });

  return await fetchServerRates;
};
