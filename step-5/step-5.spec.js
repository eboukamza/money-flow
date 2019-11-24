const {forInterval, rateAt, taxBracket, ir} = require('./step-5')

describe('rateAt', () => {

  it('return the rate', () => {
    const result = rateAt(0.2)(1000)

    expect(result).toBe(200)
  })
})

describe('forInterval', () => {

  it('should never be negative', () => {
    const amount = -100
    const result = forInterval(0, 100)(amount);

    expect(result).toBe(0)
  })

  it('max is optional', () => {
    const amount = 1000
    const result = forInterval(99)(amount)

    expect(result).toBe(901)
  })

  it('should return interval between min and max', () => {
    const amount = 1000
    const result = forInterval(20, 80)(amount)

    expect(result).toBe(60)
  })

  it('should return zero when the amount is not in the interval', () => {
    let amount = 10
    let result = forInterval(20, 80)(amount)

    expect(result).toBe(0)
  })
})

describe('taxBracket', () => {

  it('should apply rate for an interval', () => {
    let amount = 3000
    let result = taxBracket(rateAt(0.2), forInterval(1000, 2000))(amount);

    expect(result).toBe(200)
  })
})

describe('ir', () => {
  it('should calculate ir tax sub set brackets', () => {
    let amount = 30000;
    let result = ir(amount);

    expect(result).toBe(3292.82)
  })

  it('should calculate ir tax all brackets', () => {
      let amount = 150000;
      let result = ir(amount);

      expect(result).toBe(47804.54)
    })
})



