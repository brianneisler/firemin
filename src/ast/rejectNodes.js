import { curry, pipe, reject } from 'ramda'

import { update } from '../utils'

import identifyNode from './identifyNode'

const rejectNodes = curry((context, predicate, node) =>
  pipe(update('children', reject(predicate)), identifyNode(context))(node)
)

export default rejectNodes
