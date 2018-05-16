const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))
const taxCollect = (amount) => (sum, tax) => sum + tax(amount);

let bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
let bracket14 = taxBracket(rateAt(0.14), forInterval(9807,  27086))
let bracket30 =  taxBracket(rateAt(0.30), forInterval(27086, 72617))
let bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
let bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

let irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]
const ir = (amount) => irBrackets.reduce(taxCollect (amount), 0)

exports.ir = ir

// try
//const {ir} = require("./money-flow.js")
//ir(50000) // 9293.26

