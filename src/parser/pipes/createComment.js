import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createComment = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  tokenList,
  type: NodeTypes.COMMENT,
  value: tokenList.get(0).value
})

export default createComment
