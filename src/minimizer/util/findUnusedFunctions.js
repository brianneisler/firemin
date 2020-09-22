import countFunctionUses from './countFunctionUses'

const findUnusedFunctions = (scopes, ast) => {
  const functionUses = countFunctionUses(scopes, ast)
  return functionUses.filter((used) => !used)
}

export default findUnusedFunctions
