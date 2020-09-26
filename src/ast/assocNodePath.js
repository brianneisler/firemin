import { assocPath, chain } from 'ramda'

// TODO BRN: Rework this to properly work with nodes and to trigger identify
const assocNodePath = (context, path, value, node) => {
  const propPath = chain((key) => ['children', key], path)
  return assocPath(propPath, value, node)
}

export default assocNodePath
