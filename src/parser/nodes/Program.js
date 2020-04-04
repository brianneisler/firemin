import { EXPRESSION_STATEMENT, PROGRAM, SERVICE_STATEMENT } from '../../constants/NodeTypes'
import { append, has, slice } from 'ramda'
import Comment from './Comment'
import FunctionDeclaration from './FunctionDeclaration'
import ServiceDeclaration from './ServiceStatement'
import Statement from './Statement'
import Whitespace from './Whitespace'
import generateTokenList from '../../generator/generateTokenList'
import parseNextNode from '../util/parseNextNode'

const ProgramNodeParsers = [Comment, Whitespace, FunctionDeclaration, ServiceDeclaration, Statement]
const PROGRAM_BODY_NODE_TYPES = {
  [EXPRESSION_STATEMENT]: true,
  [SERVICE_STATEMENT]: true
}

const Program = {
  parse: (context, tokenList) => {
    let children = []
    let body = []

    while (tokenList.size() > 0) {
      const node = parseNextNode(context, tokenList, ProgramNodeParsers)
      children = append(node, children)
      console.log('children:', children)
      if (has(node.type, PROGRAM_BODY_NODE_TYPES)) {
        body = append(node, body)
      }

      // NOTE BRN: Remove the parsed tokens from tokenList
      const parsedTokenList = generateTokenList(context, { ast: node })
      tokenList = slice(parsedTokenList.size(), tokenList.size(), tokenList)
    }
    return {
      body,
      children,
      type: PROGRAM
    }
  }
}

export default Program
