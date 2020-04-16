import { any } from 'ramda'

const testNextNode = (parsers, context, tokenList, ...rest) =>
  any((parser) => {
    if (!parser.test) {
      throw new Error(`${parser.name} parser does not implement the 'test' method.`)
    }
    return parser.test(context, tokenList, ...rest)
  }, parsers)

export default testNextNode
