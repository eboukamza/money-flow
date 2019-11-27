const {ir, netAfterIr} = require("./money-flow.js")

test('should calculate ir', () => {
  expect(ir(50000)).toBe(9293.26)
});

test('should calculate net after ir', () => {
  expect(netAfterIr(50000)).toBe(40706.74)
})
