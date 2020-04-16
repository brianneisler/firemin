import { v4 as uuidv4 } from 'uuid'

const newScope = (parent) => ({
  functions: {},
  id: uuidv4(),
  parent
})

export default newScope
