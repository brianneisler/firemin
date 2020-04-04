import * as Nodes from './nodes'
import { ParserTypes } from '../constants'
import { Program } from './nodes'
import { filter, values } from 'ramda'

const Declarations = filter((parser) => parser.type === ParserTypes.DECLARATION, values(Nodes))
const Expressions = filter((parser) => parser.type === ParserTypes.EXPRESSION, values(Nodes))
const Statements = filter((parser) => parser.type === ParserTypes.STATEMENT, values(Nodes))

const parseTokenList = (context, { tokenList }) => {
  context = {
    ...context,
    Declarations,
    Expressions,
    Statements,
    originalTokenList: tokenList
  }
  return Program.parse(context, tokenList)
}

export default parseTokenList
