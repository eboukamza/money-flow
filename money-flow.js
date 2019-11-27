const {pipe} = require('ramda')
const {rateAt, forInterval, taxBracket, netAfter, tax, } = require('finlambda')

// IR
const bracket0 = taxBracket(rateAt(0), forInterval(0, 9807))
const bracket14 = taxBracket(rateAt(0.14), forInterval(9807, 27086))
const bracket30 = taxBracket(rateAt(0.30), forInterval(27086, 72617))
const bracket41 = taxBracket(rateAt(0.41), forInterval(72617, 153783))
const bracket45 = taxBracket(rateAt(0.45), forInterval(153783))

const irBrackets = [bracket0, bracket14, bracket30, bracket41, bracket45]

const ir = tax(irBrackets)

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
const irDividendes = pipe(rateAt(0.6), ir)
const afterIrDividendes = netAfter(irDividendes)

// Flat Tax
const flatTax = rateAt(0.3)
const afterFlatTax = netAfter(flatTax)

const withoutFlatTax = pipe(afterIs, afterCrgCrds, afterIrDividendes, Math.ceil)
const withFlatTax = pipe(afterIs, afterFlatTax, Math.ceil)

const delta = (amount) => withoutFlatTax(amount) - withFlatTax(amount)

module.exports = {
  delta
}
