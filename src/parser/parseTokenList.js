import { Program } from './nodes'
import { assoc } from 'ramda'

const parseTokenList = (context, { tokenList }) => {
  context = assoc('originalTokenList', tokenList, context)
  return Program.parse(context, tokenList)
}

export default parseTokenList
