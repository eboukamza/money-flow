const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))
const netAfter = tax => amount => amount - tax(amount)

const bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
const bracket14 = taxBracket(rateAt(0.14), forInterval(9807, 27086))
const bracket30 = taxBracket(rateAt(0.30), forInterval(27086, 72617))
const bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
const bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

const irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]

const ir = (amount) => irBrackets.reduce((sum, tax) => sum + tax(amount), 0)
const netAfterIr = netAfter(ir)

module.exports = {
  ir,
  netAfterIr
}
