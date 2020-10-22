import { NodeTypes } from '../../constants'

const createMatchStatement = ({ body, children, path }) => ({
  body,
  children,
  path,
  type: NodeTypes.MATCH_STATEMENT
})

export default createMatchStatement
