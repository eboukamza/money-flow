const {
    irpfFistActivity: irpf,
    afterIrpfFistActivity: afterIrpf,
    is15,
    isAndIrpfYield
} = require("./money-flow-es")
const {} = require("./money-flow-es");

const is15AndIrpfYield = isAndIrpfYield(is15)

let maxIrpf = 0
for (let amount = 1000; amount <= 200000; amount += 1000) {
    const amountToIs = amount - maxIrpf
    let isAndIrpfYieldValue = is15AndIrpfYield(amountToIs);
    const netAfterIrpf = afterIrpf(amount)
    let netAfterIrpfAndIs = amount - irpf(maxIrpf) - isAndIrpfYieldValue;
    if (netAfterIrpf <= netAfterIrpfAndIs) {
        console.log([amount, maxIrpf, amountToIs, irpf(maxIrpf), isAndIrpfYieldValue, netAfterIrpfAndIs ].join(','))
    } else {
        maxIrpf = amount
        console.log([amount, maxIrpf, 0, irpf(maxIrpf), 0, netAfterIrpf].join(','))
    }

}

