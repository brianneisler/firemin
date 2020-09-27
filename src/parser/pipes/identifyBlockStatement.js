import { head, tail } from 'ramda'

import BlockStatement from '../nodes/BlockStatement'

const identifyBlockStatement = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const blockStatement = BlockStatement.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    blockStatement,
    children,
    context
  }
}

export default identifyBlockStatement
