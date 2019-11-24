// Calculate the amount of a tax rate.
// introduce curry, high order functions

// now we can use map reduce for calculate ir tax
const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))

let bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
let bracket14 = taxBracket(rateAt(0.14), forInterval(9808, 27086))
let bracket30 = taxBracket(rateAt(0.30), forInterval(27087, 72617))
let bracket41 = taxBracket(rateAt(0.41), forInterval(72618, 153783))
let bracket45 = taxBracket(rateAt(0.45), forInterval(153783))
let taxBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45];

const ir = (amount) => taxBrackets.map(tax => tax(amount)).reduce((sum, amount) => sum + amount, 0)

module.exports = {
  rateAt,
  forInterval,
  taxBracket,
  ir
}
