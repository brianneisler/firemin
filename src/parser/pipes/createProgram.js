import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'

const createProgram = ({ body, children, id }) => ({
  body,
  children,
  id: id || uuidv4(),
  type: NodeTypes.PROGRAM
})

export default createProgram
