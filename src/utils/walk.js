import { curryN } from 'ramda'

const walk = curryN(2, (walkee, ...args) => {
  const walker = (...pass) => walkee(...pass, walker)
  return walkee(...args, walker)
})

export default walk
