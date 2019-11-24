const {forInterval, rateAt, taxBracket, ir} = require('./step-1')

describe('rateAt', () => {

  it('return the rate', () => {
    const result = rateAt(1000, 0.2)

    expect(result).toBe(200)
  })
})

describe('forInterval', () => {

  it('should never be negative', () => {
    const amount = -100
    const result = forInterval(amount, 0, 100)

    expect(result).toBe(0)
  })

  it('max is optional', () => {
    const amount = 1000
    const result = forInterval(amount, 99)

    expect(result).toBe(901)
  })

  it('should return interval between min and max', () => {
    const amount = 1000
    const result = forInterval(amount, 20, 80)

    expect(result).toBe(60)
  })

  it('should return zero when the amount is not in the interval', () => {
    let amount = 10
    let result = forInterval(amount, 20, 80)

    expect(result).toBe(0)
  })
})

describe('taxBracket', () => {

  it('should apply rate for an interval', () => {
    let amount = 3000
    let result = taxBracket(amount, 0.2, 1000, 2000);

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



