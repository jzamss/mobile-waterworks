import * as db from "../rsi/db";
import Rate from "../models/Rate";

const schema = "rate";

import { DUMMY_RATES } from "./dummy-data/rate";
import {consumptionRules, billingRules}  from "./dummy-data/rules"

/* load rates from local db */
export const getRates = (ruleType) => {
  const params = { schema, where: [`ruletype = '${ruleType}'`], orderBy: "salience" };
  return new Promise((resolve, reject) => {
    db.getList(params)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
};



//TODO: simulated only
//fetch updated rates from water server
export const fetchRates = async (ruleType) => {
  const rates = [];

  try {
    const rateList = await fetchUpdatedRates(ruleType);
    rateList.forEach((item) => {
      item.ruletype = ruleType;
      rates.push(db.createEntity(Rate, item));
    });

    await saveRates(rates, ruleType);
    return rates;
  } catch (err) {
    console.log("fetchRates [ERROR]", err);
    throw err;
  }
};

const saveRates = async (rates, ruleType) => {
  //clear all rates
  const params = { schema, where: [`ruletype = '${ruleType}'`] };
  await db.remove(params);
  
  const promises = [];
  rates.forEach((rate) => {
    promises.push(db.create(params, rate));
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

const fetchUpdatedRates = (ruleType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //TODO
      //this should resolve to a list of objects
      const list = ruleType === 'consumption' ? consumptionRules : billingRules;
      resolve(list);
    }, 500);
  });
};
