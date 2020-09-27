import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createPathPartWord = ({ children, word }) => ({
  children,
  id: uuidv4(),
  type: NodeTypes.PATH_PART_WORD,
  word
})

export default createPathPartWord
