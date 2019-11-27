const {ir, netAfterIr, netAfterAllTaxes} = require("./money-flow.js")

test('should calculate ir', () => {
  expect(ir(50000)).toBe(9293.26)
});

test('should calculate net after ir', () => {
  expect(netAfterIr(50000)).toBe(40706.74)
})

test('should calculate net after all taxes', () => {
  expect(netAfterAllTaxes(100000)).toBe(57956.514176000004)
})
