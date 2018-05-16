const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))
const taxCollect = (amount) => (sum, tax) => sum + tax(amount);
const netAfter = tax => amount => amount - tax(amount)
const taxApply = (amount, tax) => tax(amount)

let bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
let bracket14 = taxBracket(rateAt(0.14), forInterval(9807,  27086))
let bracket30 =  taxBracket(rateAt(0.30), forInterval(27086, 72617))
let bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
let bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

let irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]
const ir = (amount) => irBrackets.reduce(taxCollect (amount), 0)

const irDividendes = amount => ir(rateAt(0.6)(amount))
const afterIrDividendes = netAfter(irDividendes)

// IS
const isBracket15 = taxBracket(rateAt(0.15), forInterval(0, 38120))
const isBracket28 = taxBracket(rateAt(0.28), forInterval(38120))
const isBrackets = [isBracket15, isBracket28];
const is = (amount) => isBrackets.reduce(taxCollect(amount), 0)
const afterIs = netAfter(is)

// CRGCRDS
const crgCrds = rateAt(0.172)
const afterCrgCrds = netAfter(crgCrds)

// All taxes
const allTaxes = [afterIs, afterCrgCrds, afterIrDividendes]
const netAfterAllTaxes = (amount) =>  allTaxes.reduce(taxApply, amount)

exports.netAfterAllTaxes = netAfterAllTaxes

// try
//const {netAfterAllTaxes} = require("./money-flow.js")
//netAfterAllTaxes(50000) // 458038.092864
