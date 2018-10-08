const moneyflow = require('./money-flow.js');

describe('rateAt', () => {
  it('return the rate', () => {
    const result = moneyflow.rateAt(0.4)(100)

    expect(result).toBe(40)
  })
})

describe('forInterval', () => {
  it('should never be negative', () => {
    const amount = -100;
    const result = moneyflow.forInterval(0, 100)(amount);

    expect(result).toBe(0);
  });

  it('max is optional', () => {
    const amount = 1000;
    const result = moneyflow.forInterval(99)(amount);

    expect(result).toBe(901);
  });

  it('should return interval between min and max', () => {
    const amount = 1000;
    const result = moneyflow.forInterval(20, 80)(amount);

    expect(result).toBe(60);
  });

  it('should return zero when the amount is not in the interval', () => {
    let amount = 10;
    let result = moneyflow.forInterval(20, 80)(amount);

    expect(result).toBe(0);
  })
});

describe('taxApply', () => {
  it('should calculate the tax amount of a tax', () => {
    const amount = 1000;
    const tax = (amount) => amount * 0.1;

    const result = moneyflow.taxApply(amount)(tax)

    expect(result).toBe(100);

  })
});

describe('tax', () => {
  it('is the sum of apply each bracket', () => {
    const bracket = (amount) => amount * 0.1;
    const bracket2 = (amount) => amount * 0.2;
    const bracket3 = (amount) => amount * 0.3;

    const result = moneyflow.tax([bracket, bracket2, bracket3])(1000);

    expect(result).toBe(600)
  })
})

describe('netAmountOf', () => {
  it('is the amount after substact a tax', () => {
    const tax = () => 100;

    const result = moneyflow.netAfter(tax)(350);

    expect(result).toBe(250)
  })
})


test('delta of 244420 is the inflexion point', () => {
  expect(moneyflow.delta(244420)).toBe(0);
});
