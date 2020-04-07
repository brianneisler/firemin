import { any } from 'ramda'

const testNextNode = (parsers, context, tokenList) =>
  any((parser) => {
    if (!parser.test) {
      throw new Error(`${parser.name} parser does not implement the 'test' method.`)
    }
    return parser.test(context, tokenList)
  }, parsers)

export default testNextNode
