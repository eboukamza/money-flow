const {compose, sum, map} = require('ramda');

// introduce ramda, using compose, map, sum
const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => compose(rate, interval)(amount)
const taxApply = amount => tax => tax(amount)
const tax = taxBrackets => amount => compose(sum, map)(taxApply(amount), taxBrackets) // same as map reduce of step 3

let bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
let bracket14 = taxBracket(rateAt(0.14), forInterval(9808, 27086))
let bracket30 = taxBracket(rateAt(0.30), forInterval(27087, 72617))
let bracket41 = taxBracket(rateAt(0.41), forInterval(72618, 153783))
let bracket45 = taxBracket(rateAt(0.45), forInterval(153783))
let irTaxBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45];

const ir = tax(irTaxBrackets);

module.exports = {
  rateAt,
  forInterval,
  taxBracket,
  ir
}
