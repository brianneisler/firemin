import { slice } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createWhitespace from '../pipes/createWhitespace'

const Whitespace = {
  identify: (context, node) => node,
  is: (value) => value && value.type === NodeTypes.WHITESPACE,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected whitespace . Instead reached the end of the file.`
      )
    }
    return createWhitespace({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.WHITESPACE
}

export default Whitespace
