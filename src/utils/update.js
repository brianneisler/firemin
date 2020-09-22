import { assoc, prop } from 'ramda'

const update = (propName, updater, value) => {
  const current = prop(propName, value)
  const result = updater(current)
  if (result !== current) {
    return assoc(propName, result, value)
  }
  return value
}

export default update
