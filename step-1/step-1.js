// Calculate the amount of a tax rate.
// trivial example

const rateAt = (amount, rate) => amount * rate
const forInterval = (amount, min, max) => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (amount, rate, min, max) => rateAt(forInterval(amount, min, max), rate)

const ir = (amount) => taxBracket(amount, 0, 0, 9897) +
  taxBracket(amount, 0.14, 9808, 27086) +
  taxBracket(amount, 0.30, 27087, 72617) +
  taxBracket(amount, 0.41, 72618, 153783) +
  taxBracket(amount, 0.45, 153784)


module.exports = {
  rateAt,
  forInterval,
  taxBracket,
  ir
}
