import * as db from "../rsi/db";
import Rate from "../models/Rate";

import getService from "../api/server-remote-proxy";
const Service = getService();

const schema = "rate";

/* load rates from local db */
export const getRates = ({ ruleType }) => {
  const params = {
    schema,
    where: [`ruletype = '${ruleType}'`],
    orderBy: "salience",
  };
  return db.getList(params);
};

export const fetchRates = async (params) => {
  const rates = [];
  const rateList = await fetchUpdatedRates(params);
  rateList.forEach((item) => {
    item.ruletype = params.ruleType;
    rates.push(db.createEntity(Rate, item));
  });
  if (rates.length > 0) {
    await saveRates(rates, params.ruleType);
  }
  return rates;
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

const fetchUpdatedRates = async ({ ruleType, connection }) => {
  const svc = await Service.lookup("WaterworksMobileSettingService");
  if (ruleType === "consumption") {
    return await svc.getConsumptionRateRules();
  }
  return await svc.getBillingRules(); 
};
