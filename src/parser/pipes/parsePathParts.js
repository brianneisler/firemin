import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import PathPartExpression from '../nodes/PathPartExpression'
import PathPartVariable from '../nodes/PathPartVariable'
import PathPartWord from '../nodes/PathPartWord'
import { parseNextNode, testNextNode } from '../util'

const PATH_PART_PARSERS = [PathPartExpression, PathPartVariable, PathPartWord]
const parsePathPartNode = parseNextNode(PATH_PART_PARSERS)

const parsePathPart = ({ children, context, tokenList, ...rest }) => {
  const pathPart = parsePathPartNode(context, tokenList)
  children = append(pathPart, children)
  const parsedTokenList = generateTokenList(context, { ast: pathPart })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, pathPart, tokenList }
}

const parsePathParts = (props) => {
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

export default parsePathParts
