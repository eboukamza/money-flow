const {pipe} = require('ramda')
const {rateAt, forInterval, taxBracket, netAfter, tax} = require('finlambda')

// IRPF
const bracket19 = taxBracket(rateAt(0.19), forInterval(0, 12450))
const bracket24 = taxBracket(rateAt(0.24), forInterval(12450, 20000))
const bracket30 = taxBracket(rateAt(0.30), forInterval(20000, 35200))
const bracket37 = taxBracket(rateAt(0.37), forInterval(35200, 60000))
const bracket45 = taxBracket(rateAt(0.45), forInterval(60000, 300000))
const bracket47 = taxBracket(rateAt(0.47), forInterval(300000))

const irBrackets = [bracket19, bracket24, bracket30, bracket37, bracket45, bracket47]

const irpf = pipe(tax(irBrackets), Math.ceil)
const afterIrpf = netAfter(irpf)

// IRPF fist activity
const netRevenues = rateAt(0.95)
const netRevenuesWithFirstActivityReduction = pipe(netRevenues, rateAt(0.80))
const irpfFistActivity = pipe(netRevenuesWithFirstActivityReduction, irpf)
const afterIrpfFistActivity = netAfter(irpfFistActivity)

// IS 15
const is15 = pipe(rateAt(0.15), Math.ceil)
const afterIs15 = netAfter(is15)

// IS 25
const is25 = pipe(rateAt(0.25), Math.ceil)
const afterIs25 = netAfter(is25)

// yields
const bracket19y =  taxBracket(rateAt(0.19), forInterval(0, 6000))
const bracket21y =  taxBracket(rateAt(0.21), forInterval(6000, 50000))
const bracket23y =  taxBracket(rateAt(0.23), forInterval(50000, 200000))
const bracket26y =  taxBracket(rateAt(0.26), forInterval(200000))

const irpfYieldsBrackets = [bracket19y, bracket21y, bracket23y, bracket26y]
const irpfYield = pipe(tax(irpfYieldsBrackets), Math.ceil)
const afterIrpfYield = netAfter(irpfYield)

const irpfYieldWithReduction = pipe(rateAt(0.5), irpfYield)

const isAndIrpfYield = is => amount => is(amount) + irpfYieldWithReduction(netAfter(is)(amount))
const afterIsAndIrpfYield = is => netAfter(isAndIrpfYield(is))

// utils
const taxRate = (grossAmount, taxAmount) => (taxAmount/grossAmount).toPrecision(4)

const buildTotalIRPF = (irpf, is) => maxIrpf => amount => {
    const isAmount = Math.max(amount - maxIrpf, 0)
    const irpfAmount = amount - isAmount
    return irpf(irpfAmount) + is(isAmount)
}

const totalIRPFFirstActivity = buildTotalIRPF(irpfFistActivity, isAndIrpfYield(is15))

// ex totalIRPF(37000, 41000)
const totalIRPF = buildTotalIRPF(pipe(netRevenues, irpf), isAndIrpfYield(is25))

module.exports = {
    irpf,
    irpfFistActivity,
    afterIrpfFistActivity,
    irpfYield,
    irpfYieldWithReduction,
    afterIrpf,
    afterIrpfYield,
    netRevenues,
    netRevenuesWithFirstActivityReduction,
    is15,
    afterIs15,
    is25,
    afterIs25,
    taxRate,
    isAndIrpfYield,
    afterIsAndIrpfYield,
    totalIRPF,
    totalIRPFFirstActivity
}
