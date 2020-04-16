import { NodeTypes, ParserTypes } from '../../constants'
import { append, pipe, slice } from 'ramda'
import { parseNextNode, testNextNode } from '../util'
import { v4 as uuidv4 } from 'uuid'
import PathPartExpression from './PathPartExpression'
import PathPartVariable from './PathPartVariable'
import PathPartWord from './PathPartWord'
import generateTokenList from '../../generator/generateTokenList'

const PATH_PART_PARSERS = [PathPartExpression, PathPartVariable, PathPartWord]
const parsePathPartNode = parseNextNode(PATH_PART_PARSERS)

const parsePathPart = ({ children, context, tokenList, ...rest }) => {
  const pathPart = parsePathPartNode(context, tokenList)
  children = append(pathPart, children)
  const parsedTokenList = generateTokenList(context, { ast: pathPart })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, pathPart, tokenList }
}

const parsePath = (props) => {
  let { children, context, tokenList } = props
  let path = []
  while (testNextNode(PATH_PART_PARSERS, context, tokenList)) {
    let pathPart
    ;({ children, context, pathPart, tokenList } = parsePathPart({
      children,
      context,
      tokenList
    }))
    path = append(pathPart, path)
  }
  return { ...props, children, context, path, tokenList }
}

const createPathExpression = pipe(parsePath, ({ children, path }) => ({
  children,
  id: uuidv4(),
  path,
  type: NodeTypes.PATH_EXPRESSION
}))

const PathExpression = {
  parse: (context, tokenList) => createPathExpression({ children: [], context, tokenList }),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(PATH_PART_PARSERS, context, tokenList, prevExpression),
  type: ParserTypes.EXPRESSION
}

export default PathExpression
