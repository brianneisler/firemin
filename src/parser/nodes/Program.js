import { PROGRAM } from '../../constants/NodeTypes'
import { pipe } from 'ramda'
import parseBodyUntil from '../pipes/parseBodyUntil'

const createProgram = pipe(
  parseBodyUntil(() => true),
  ({ body, children }) => ({
    body,
    children,
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
