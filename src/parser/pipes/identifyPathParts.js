import { append, head, length, tail } from 'ramda'

import PathPartExpression from '../nodes/PathPartExpression'
import PathPartVariable from '../nodes/PathPartVariable'
import PathPartWord from '../nodes/PathPartWord'
import { identifyNextNode, isNextNode } from '../util'

const PATH_PART_IDENTIFIERS = [
  PathPartExpression,
  PathPartVariable,
  PathPartWord
]
const identifyPathPartNode = identifyNextNode(PATH_PART_IDENTIFIERS)

const identifyPathPart = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const pathPart = identifyPathPartNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, pathPart }
}

const identifyPathParts = (props) => {
  let { children, context } = props
  let path = []
  let nextChild = head(children)
  while (length(children) > 0 && isNextNode(PATH_PART_IDENTIFIERS, nextChild)) {
    let pathPart
    ;({ children, context, pathPart } = identifyPathPart({
      children,
      context
    }))
    path = append(pathPart, path)
    nextChild = head(children)
  }
  return { ...props, children, context, path }
}

export default identifyPathParts
