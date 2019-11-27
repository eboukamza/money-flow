const {delta} = require("./money-flow.js")


test('delta of 244420 is the inflexion point', () => {
  expect(delta(244420)).toBe(0);
});
