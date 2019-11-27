const rateAt = rate => amount => amount * rate
const forInterval = (min, max) => amount => Math.max(Math.min(max || amount, amount) - min, 0)
const taxBracket = (rate, interval) => amount => rate(interval(amount))
const netAfter = tax => amount => amount - tax(amount)
const tax = taxBrackets => amount => taxBrackets.reduce((sum, tax) => sum + tax(amount), 0)
const taxApply = (amount, tax) => tax(amount)

// IR
const bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
const bracket14 = taxBracket(rateAt(0.14), forInterval(9807, 27086))
const bracket30 = taxBracket(rateAt(0.30), forInterval(27086, 72617))
const bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
const bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

const irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]

const ir = tax(irBrackets)
const netAfterIr = netAfter(ir)

// IS
const isBracket15 = taxBracket(rateAt(0.15), forInterval(0, 38120))
const isBracket28 = taxBracket(rateAt(0.28), forInterval(38120))

const isBrackets = [isBracket15, isBracket28]
const is = tax(isBrackets)
const afterIs = netAfter(is)

// CRG CRDS
const crgCrds = rateAt(0.172)
const afterCrgCrds = netAfter(crgCrds)

// IR Dividendes
const irDividendes = amount => ir(rateAt(0.6)(amount))
const afterIrDividendes = netAfter(irDividendes)

const allTaxes = [afterIs, afterCrgCrds, afterIrDividendes]
const netAfterAllTaxes = (amount) =>  allTaxes.reduce(taxApply, amount)


module.exports = {
  ir,
  netAfterIr,
  netAfterAllTaxes
}
