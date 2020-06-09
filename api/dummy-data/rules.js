export const consumptionRules = [
  {
    rulename: "COMPUTATION_FOR_SUBDIVISION",
    type: "consumption",
    salience: 10000,
    script: `
    function COMPUTATION_FOR_SUBDIVISION(facts, result) {
      var WC = facts.WaterConsumption;
      var VOL = facts.WaterConsumption.volume;
      var UNITS = facts.WaterAccount.units;
      if (
        facts.WaterworksAttribute.name.match(".*SUBDIVISION.*") != null &&
        facts.WaterAccount.classification.match(".*RESIDENTIAL.*") != null
      ) {
        var action0 = function () {
          if (VOL <= 10 * UNITS) {
            return 1.8 * VOL;
          } else if (VOL <= 20 * UNITS) {
            return 18 * UNITS + (VOL - 10 * UNITS) * 2.3;
          } else if (VOL <= 30 * UNITS) {
            return 41 * UNITS + (VOL - 20 * UNITS) * 2.8;
          } else if (VOL <= 40 * UNITS) {
            return 69 * UNITS + (VOL - 30 * UNITS) * 3.4;
          } else {
            return 103 * UNITS + (VOL - 40 * UNITS) * 5;
          }
        };
        WC.amount = action0();
        return true;
      } else {
        return false;
      }
    }
    `,
  },
  {
    rulename: "COMPUTATION_FOR_RESIDENTAIL",
    type: "consumption",
    salience: 10000,
    script: `  
    function COMPUTATION_FOR_RESIDENTAIL(facts, result) {
      var WC = facts.WaterConsumption;
      var VOL = facts.WaterConsumption.volume;
      if (
        facts.WaterAccount.classification.match(".*RESIDENTIAL|GOVERNMENT.*") !=
        null
      ) {
        var action0 = function () {
          if (VOL <= 10.0) {
            return 20;
          } else if (VOL <= 20.0) {
            return 20 + (VOL - 10) * 2.3;
          } else if (VOL <= 30.0) {
            return 43 + (VOL - 20) * 2.8;
          } else if (VOL <= 40.0) {
            return 71 + (VOL - 30) * 3.4;
          } else if (VOL <= 50.0) {
            return 105 + (VOL - 40) * 4.1;
          } else {
            return 146 + (VOL - 50) * 5.0;
          }
        };
        WC.amount = action0();
        return true;
      } else {
        return false;
      }
    }`,
  },
];

export const billingRules = [
  {
    rulename: "ADD_ENV_FEE",
    salience: 50000,
    script:
      "function ADD_ENV_FEE(facts,result) { var WB=facts.WaterBill;var BYR=facts.WaterBill.year;var BMON=facts.WaterBill.month;var WC=facts.WaterConsumption;var VOL=facts.WaterConsumption.volume;if( facts.WaterConsumption.volume>0) { result.push({ year: BYR,month: BMON,amount: VOL * 0.50,itemid: 'WATER_ENVFEE',itemtitle:'ENVIRONMENTAL FEE'}); return true; }else { return false; } }",
  },
  {
    rulename: "ADD_WATER_FEE",
    salience: 50000,
    script:
      "function ADD_WATER_FEE(facts,result) { var WC=facts.WaterConsumption;var AMT=facts.WaterConsumption.amount;var WB=facts.WaterBill;var YR=facts.WaterBill.year;var MON=facts.WaterBill.month;if( facts.WaterConsumption.amount>0.00 && facts.WaterConsumption.hold== false) { result.push({ year: YR,month: MON,amount: AMT,itemid: 'WATER_FEE',itemtitle:'WATER FEE'}); return true; }else { return false; } }",
  },
];
