import { find } from 'ramda'

import { NodeTypes } from '../../constants'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

// TODO BRN: Not sure this is needed
const identifyKeyword = (context, node, ...rest) => {
  const { Keywords } = context
  const type = find((keyword) => keyword.is(node), Keywords)
  if (!type) {
    throw new Error(`Could not find Keyword parser for ${node}`)
  }
  return type.identify(context, node, ...rest)
}

const Keyword = {
  identify: identifyKeyword,
  is: (value) => value.type === NodeTypes.KEYWORD,
  parse: (context, tokenList, prevExpression = null) =>
    parseNextNode(context.Keywords, context, tokenList, prevExpression),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Keywords, context, tokenList, prevExpression)
}

export default Keyword
