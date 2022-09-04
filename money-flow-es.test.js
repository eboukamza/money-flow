const {
    irpfFistActivity,
    irpfYieldWithReduction,
    irpfYield,
    is15,
    irpf,
    netRevenues,
    netRevenuesWithFirstActivityReduction, isAndIrpfYield, afterIsAndIrpfYield
} = require("./money-flow-es")

test('demo es', () => {

    expect(netRevenues(10000)).toBe(9500) // 0.95
    expect(netRevenuesWithFirstActivityReduction(10000)).toBe(7600) // 0.26

    expect(irpf(7600)).toBe(1444) // 0.19
    expect(irpf(7600)).toBe(irpfFistActivity(10000))

    expect(is15(10000)).toBe(1500)

    expect(irpfYieldWithReduction(8500)).toBe(808) // 10000 - 1500 = 8500
    expect(irpfYieldWithReduction(8500)).toBe(irpfYield(4250)) // 8500 * 0.5

    const is15AndIrpfYield = isAndIrpfYield(is15)
    expect(is15AndIrpfYield(10000)).toBe(2308) // 1500 + 808

    const netAfterIs15AndIrpfYield = afterIsAndIrpfYield(is15)
    expect(netAfterIs15AndIrpfYield(10000)).toBe(7692)

});
