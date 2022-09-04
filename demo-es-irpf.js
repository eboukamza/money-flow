const {
    irpf: irpfGross,
} = require("./money-flow-es")
const {pipe} = require("ramda");
const {rateAt, netAfter} = require("finlambda");

const irpf = pipe(rateAt(0.95), irpfGross)
const afterIrpf = netAfter(irpf)

for (let amount = 1000; amount <= 200000; amount += 1000) {
    console.log([amount, irpf(amount), afterIrpf(amount)].join(','))
}

