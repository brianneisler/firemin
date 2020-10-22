import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'
import generateString from '../../generator/generateString'

const createWord = ({ context, id, tokenList }) => ({
  id: id || uuidv4(),
  tokenList,
  type: NodeTypes.WORD,
  value: generateString(context, { tokenList })
})

export default createWord
