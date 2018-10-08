const {compose, pipe, map, sum, curry} = require('ramda');

const rateAt = curry((rate, amount) => amount * rate)
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rateAt, forInterval) => compose(rateAt, forInterval)
const netAfter = tax => amount => amount - tax(amount)
const tax = taxBrackets => amount => compose(sum, map)(taxApply(amount), taxBrackets)
const taxApply = curry((amount, tax) => tax(amount))

let bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
let bracket14 = taxBracket(rateAt(0.14), forInterval(9807,  27086))
let bracket30 =  taxBracket(rateAt(0.30), forInterval(27086, 72617))
let bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
let bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

let irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]
let ir = tax(irBrackets)

const irDividendes = pipe(rateAt(0.6), ir)
const afterIrDividendes = netAfter(irDividendes)

// IS
const isBracket15 = taxBracket(rateAt(0.15), forInterval(0, 38120))
const isBracket28 = taxBracket(rateAt(0.28), forInterval(38120))
const isBrackets = [isBracket15, isBracket28];
const is = tax(isBrackets)
const afterIs = netAfter(is)

// CRGCRDS
const crgCrds = rateAt(0.172)
const afterCrgCrds = netAfter(crgCrds)

// flat tax
const flatTax = rateAt(0.3)
const afterFlatTax = netAfter(flatTax)

let withoutFlatTax = pipe(afterIs, afterCrgCrds, afterIrDividendes, Math.ceil)
let withFlatTax = pipe(afterIs, afterFlatTax, Math.ceil);

// and then
const delta = (amount) => withoutFlatTax(amount) - withFlatTax(amount)

module.exports = {
    rateAt,
    forInterval,
    taxApply,
    tax,
    netAfter,
    delta
};
