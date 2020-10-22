import { head, tail } from 'ramda'

import Entry from '../nodes/Entry'

const identifyEntry = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const entry = Entry.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    context,
    entry
  }
}

export default identifyEntry
