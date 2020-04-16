import { countLinesAndCharacters } from '../../utils'
import generateString from '../../generator/generateString'

const getTokenListPosition = (context, tokenList) => {
  const { originalTokenList } = context
  const originalData = generateString(context, { tokenList: originalTokenList })
  const remaningData = generateString(context, { tokenList })
  return countLinesAndCharacters(
    originalData.substring(0, originalData.length - remaningData.length)
  )
}

export default getTokenListPosition
