import { head, tail } from 'ramda'

import Word from '../nodes/Word'

const identifyWord = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const word = Word.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    word
  }
}

export default identifyWord
