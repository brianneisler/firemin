import { append, slice } from 'ramda'
import FunctionParameters from '../nodes/FunctionParameters'
import generateTokenList from '../../generator/generateTokenList'

const parseFunctionParameters = ({ children, context, tokenList, ...rest }) => {
  const functionParameters = FunctionParameters.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: functionParameters })
  return {
    ...rest,
    children: append(functionParameters, children),
    functionParameters,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseFunctionParameters
