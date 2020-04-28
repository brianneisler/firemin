import { append, slice } from 'ramda'
import QuestionMarkOperator from '../nodes/QuestionMarkOperator'
import generateTokenList from '../../generator/generateTokenList'

const parseQuestionMarkOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = QuestionMarkOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseQuestionMarkOperator
