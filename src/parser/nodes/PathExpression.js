import { pipe } from 'ramda'

import { NodeTypes, ParserTypes } from '../../constants'
import createPathExpression from '../pipes/createPathExpression'
import identifyPathParts from '../pipes/identifyPathParts'
import parsePathParts from '../pipes/parsePathParts'
import { testNextNode } from '../util'

import PathPartExpression from './PathPartExpression'
import PathPartVariable from './PathPartVariable'
import PathPartWord from './PathPartWord'

const PATH_PART_PARSERS = [PathPartExpression, PathPartVariable, PathPartWord]

const identifyPathExpressionChildren = pipe(identifyPathParts)

const parsePathExpressionTokens = pipe(parsePathParts, createPathExpression)

const PathExpression = {
  identify: (context, node) =>
    createPathExpression({
      ...identifyPathExpressionChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PATH_EXPRESSION,
  parse: (context, tokenList) =>
    parsePathExpressionTokens({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(PATH_PART_PARSERS, context, tokenList, prevExpression),
  type: ParserTypes.EXPRESSION
}

export default PathExpression
