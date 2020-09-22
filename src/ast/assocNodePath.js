import { assocPath, chain } from 'ramda'

const assocNodePath = (path, value, node) => {
  const propPath = chain((key) => ['children', key], path)
  return assocPath(propPath, value, node)
}

export default assocNodePath
