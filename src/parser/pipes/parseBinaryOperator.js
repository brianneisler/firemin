import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
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
import { parseNextNode } from '../util'

const BINARY_OPERATOR_PARSERS = [
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

const parseBinaryOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = parseNextNode(BINARY_OPERATOR_PARSERS, context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseBinaryOperator
