import generateString from '../../generator/generateString'
import { countLinesAndCharacters } from '../../utils'

const getTokenListPosition = (context, tokenList) => {
  const { originalTokenList } = context
  const originalData = generateString(context, { tokenList: originalTokenList })
  const remaningData = generateString(context, { tokenList })
  return countLinesAndCharacters(
    originalData.substring(0, originalData.length - remaningData.length)
  )
}

export default getTokenListPosition
