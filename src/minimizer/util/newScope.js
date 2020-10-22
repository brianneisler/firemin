import { v4 as uuidv4 } from 'uuid'

const newScope = (parent) => {
  const scope = {
    calls: {},
    children: {},
    functions: {},
    id: uuidv4(),
    parent
  }
  if (parent) {
    parent.children[scope.id] = scope
  }
  return scope
}

export default newScope
