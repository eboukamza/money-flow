const {irpfYield, afterIs15: afterIs, is15: is} = require("./money-flow-es.js")
const {rateAt} = require('finlambda')
const {pipe} = require('ramda')

const taxRate = (grossAmount, taxAmount) => (taxAmount/grossAmount).toPrecision(2)
const withReduction = pipe(afterIs, rateAt(0.5))
const irpfYeldWithReduction = pipe(withReduction, irpfYield)
const allTaxes = amount => is(amount) + irpfYeldWithReduction(amount)
const afterAllTaxes = amount => amount - allTaxes(amount)

for(let amount = 1000; amount <= 200000; amount += 1000){
  console.log([amount, is(amount), irpfYeldWithReduction(amount), allTaxes(amount), afterAllTaxes(amount), taxRate(amount, allTaxes(amount))].join(','))
}

