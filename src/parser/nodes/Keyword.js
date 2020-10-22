import { findIdentifier } from '../../ast'
import { NodeTypes } from '../../constants'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Keyword = {
  identify: (context, node, ...rest) => {
    const { Keywords } = context
    const type = findIdentifier(Keywords, node)
    if (!type) {
      throw new Error(`Could not find Keyword parser for ${node}`)
    }
    return type.identify(context, node, ...rest)
  },
  is: (value) => value.type === NodeTypes.KEYWORD,
  parse: (context, tokenList, prevExpression = null) =>
    parseNextNode(context.Keywords, context, tokenList, prevExpression),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Keywords, context, tokenList, prevExpression)
}

export default Keyword
