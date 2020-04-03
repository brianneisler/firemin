import { any } from 'ramda'

const testNextNode = (tokenList, parsers) => any((parser) => parser.test(tokenList), parsers)

export default testNextNode
