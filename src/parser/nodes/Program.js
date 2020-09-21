import { pipe } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { PROGRAM } from '../../constants/NodeTypes'
import parseBodyUntil from '../pipes/parseBodyUntil'

const createProgram = pipe(
  parseBodyUntil(() => true),
  ({ body, children }) => ({
    body,
    children,
    id: uuidv4(),
    type: PROGRAM
  })
)

const Program = {
  parse: (context, tokenList) =>
    createProgram({
      children: [],
      context,
      tokenList
    })
}

export default Program
