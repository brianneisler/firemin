import { any } from 'ramda'

const testNextNode = (context, tokenList, parsers) =>
  any((parser) => parser.test(context, tokenList), parsers)

export default testNextNode
