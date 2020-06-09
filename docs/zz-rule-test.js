const ruleString = 
  `(function COMPUTATION_FOR_SUBDIVISION(facts, result) {
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
  })
`

const facts = {
  WaterConsumption: {
    volume: 10,
  },
  WaterAccount: {
    units: 2,
    classification: 'RESIDENTIAL'
  },
  WaterworksAttribute: {
    name: 'SUBDIVISION',
  }
}
const ruleFn = eval(ruleString)
console.log(ruleFn(facts, []));
console.log(facts)

  
  