import { head, tail } from 'ramda'

import DivideOperator from '../nodes/DivideOperator'
import EqualityOperator from '../nodes/EqualityOperator'
import GreaterThanEqualOperator from '../nodes/GreaterThanEqualOperator'
import GreaterThanOperator from '../nodes/GreaterThanOperator'
import InequalityOperator from '../nodes/InequalityOperator'
import IsOperator from '../nodes/IsOperator'
import LessThanEqualOperator from '../nodes/LessThanEqualOperator'
import LessThanOperator from '../nodes/LessThanOperator'
import LogicalAndOperator from '../nodes/LogicalAndOperator'
import LogicalOrOperator from '../nodes/LogicalOrOperator'
import ModulusOperator from '../nodes/ModulusOperator'
import MultiplyOperator from '../nodes/MultiplyOperator'
import UnaryMinusOperator from '../nodes/UnaryMinusOperator'
import UnaryPlusOperator from '../nodes/UnaryPlusOperator'
import { identifyNextNode } from '../util'

const BINARY_OPERATOR_IDENTIFIERS = [
  DivideOperator,
  EqualityOperator,
  GreaterThanEqualOperator,
  GreaterThanOperator,
  InequalityOperator,
  IsOperator,
  LessThanEqualOperator,
  LessThanOperator,
  LogicalAndOperator,
  LogicalOrOperator,
  ModulusOperator,
  MultiplyOperator,
  UnaryMinusOperator,
  UnaryPlusOperator
]
const identifyBinaryOperatorNode = identifyNextNode(BINARY_OPERATOR_IDENTIFIERS)

const identifyBinaryOperator = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const operator = identifyBinaryOperatorNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, operator }
}

export default identifyBinaryOperator
