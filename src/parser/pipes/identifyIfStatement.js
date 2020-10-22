import { head, tail } from 'ramda'

import IfStatement from '../nodes/IfStatement'

const identifyIfStatement = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const statement = IfStatement.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    context,
    statement
  }
}

export default identifyIfStatement
