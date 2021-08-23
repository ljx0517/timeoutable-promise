class TimeoutError extends Error {
  constructor () {
    super()
    this.name = 'TimeoutError'
  }
}

function isTimeoutError (err) {
  return err instanceof TimeoutError
}

class TimerPromise {
  promise = null
  timeout = null
  timerId = null
  timeoutSymbol = Symbol('TimerPromiseTimeoutSymbol')
  constructor (fn, timeout) {
    const p = new Promise((resolve, reject) => {
      fn(resolve, reject)
    })
    this.promise = p
    this.timeout = timeout || 0
    return this.startRace()
  }

  createTimer () {
    return new Promise((resolve) => {
      this.timerId = setTimeout(resolve, this.timeout, this.timeoutSymbol)
    })
  }

  async startRace () {
    if (this.timeout <= 0) {
      return this.promise
    }

    const result = await Promise.race([this.promise, this.createTimer()])

    if (result === this.timeoutSymbol) {
      throw new TimeoutError('timeout')
    }

    clearTimeout(this.timerId)
    return result
  }
}

module.exports = {
  TimerPromise,
  TimeoutError,
  isTimeoutError
}
