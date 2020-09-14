import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Entry from '../nodes/Entry'

const parseEntry = ({ children, context, tokenList, ...rest }) => {
  const entry = Entry.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: entry })
  return {
    ...rest,
    children: append(entry, children),
    context,
    entry,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseEntry
