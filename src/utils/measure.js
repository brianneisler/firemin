// import { isString } from 'lodash'

const measure = (name, func) => {
  // let nameFunc = name
  // if (isString(name)) {
  //   nameFunc = () => name
  // }
  return (...args) => {
    // const start = Date.now()
    // const nameString = nameFunc(...args)
    // eslint-disable-next-line no-console
    // console.debug(`${nameString} execution started...`)
    const result = func(...args)
    // const duration = Date.now() - start
    // eslint-disable-next-line no-console
    // console.debug(`${nameString} execution completed in ${duration}ms`)
    return result
  }
}

export default measure
