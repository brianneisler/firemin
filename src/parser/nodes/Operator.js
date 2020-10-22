import { findIdentifier } from '../../ast'
import { NodeTypes } from '../../constants'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Operator = {
  identify: (context, node, ...rest) => {
    const { Operators } = context
    const type = findIdentifier(Operators, node)
    if (!type) {
      throw new Error(`Could not find Operator Identifier for ${node}`)
    }
    return type.identify(context, node, ...rest)
  },
  is: (value) => value.type === NodeTypes.OPERATOR,
  parse: (context, tokenList, prevExpression = null) =>
    parseNextNode(context.Operators, context, tokenList, prevExpression),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Operators, context, tokenList, prevExpression)
}

export default Operator
