import { head, tail } from 'ramda'

import Identifier from '../nodes/Identifier'
import { identifyNextNode } from '../util'

const PERMISSION_IDENTIFIERS = [Identifier]
const identifyPermissionNode = identifyNextNode(PERMISSION_IDENTIFIERS)

const identifyPermission = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const permission = identifyPermissionNode(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, permission }
}

export default identifyPermission
