import { pipe } from 'ramda'

import { NodeTypes } from '../../constants'
import createProgram from '../pipes/createProgram'
import identifyBodyUntil from '../pipes/identifyBodyUntil'
import parseBodyUntil from '../pipes/parseBodyUntil'

const parseProgramTokens = pipe(
  parseBodyUntil(() => true),
  createProgram
)

const identifyProgramChildren = pipe(identifyBodyUntil(() => true))

const Program = {
  identify: (context, node) =>
    createProgram({
      ...identifyProgramChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.PROGRAM,
  parse: (context, tokenList) =>
    parseProgramTokens({
      children: [],
      context,
      tokenList
    })
}

export default Program
