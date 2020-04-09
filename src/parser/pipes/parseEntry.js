import { append, slice } from 'ramda'
import Entry from '../nodes/Entry'
import generateTokenList from '../../generator/generateTokenList'

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
