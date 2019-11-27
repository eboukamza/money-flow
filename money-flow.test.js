const {ir} = require("./money-flow.js")

test('should calculate ir', () => {
  expect(ir(50000)).toBe(9293.26)
});
