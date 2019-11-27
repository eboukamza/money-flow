const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))

const bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
const bracket14 = taxBracket(rateAt(0.14), forInterval(9807, 27086))
const bracket30 = taxBracket(rateAt(0.30), forInterval(27086, 72617))
const bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
const bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

// trivial
const ir = (amount) => bracket0(amount) + bracket14(amount) + bracket30(amount) + bracket41(amount) + bracket45(amount)

module.exports = {ir}
