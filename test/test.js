/* eslint-env mocha */
const chai = require('chai')
const assert = chai.assert
const {
  TimeoutablePromise,
  TimeoutError
} = require('../index')

describe('test timeout', function () {
  it('return before timeout', async function () {
    const p = new TimeoutablePromise((resolve, reject) => {
      // wait 2 secs resolve the promise
      setTimeout(() => {
        resolve(1)
      }, 0.5 * 1000)
    }, 1 * 1000) // this task will break after 1 secs
    const r = await p
    assert(r === 1)
  })
  it('return after timeout', async function () {
    const p = new TimeoutablePromise((resolve, reject) => {
      // wait 2 secs resolve the promise
      setTimeout(() => {
        resolve(1)
      }, 1.5 * 1000)
    }, 1 * 1000) // this task will break after 1 secs

    try {
      await p
    } catch (e) {
      assert(e instanceof TimeoutError)
    }
  })
})
