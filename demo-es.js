const {
    irpf: irpfGross,
    is25,
    isAndIrpfYield
} = require("./money-flow-es")
const {pipe} = require("ramda");
const {rateAt, netAfter} = require("finlambda");

const is25AndIrpfYield = isAndIrpfYield(is25)
const irpf = pipe(rateAt(0.95), irpfGross)
const afterIrpf = netAfter(irpf)

let maxIrpf = 0
for (let amount = 1000; amount <= 200000; amount += 1000) {
    const amountToIs = amount - maxIrpf
    let isAndIrpfYieldValue = is25AndIrpfYield(amountToIs);
    const netAfterIrpf = afterIrpf(amount)
    let netAfterIrpfAndIs = amount - irpf(maxIrpf) - isAndIrpfYieldValue;
    if (netAfterIrpf <= netAfterIrpfAndIs) {
        console.log([amount, maxIrpf, amountToIs, irpf(maxIrpf), isAndIrpfYieldValue, netAfterIrpfAndIs ].join(','))
    } else {
        maxIrpf = amount
        console.log([amount, maxIrpf, 0, irpf(maxIrpf), 0, netAfterIrpf].join(','))
    }

}

