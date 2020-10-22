import countFunctionUses from './countFunctionUses'

const findUnusedFunctions = (context, ast) => {
  const functionUses = countFunctionUses(context, ast)
  return functionUses.filter((used) => !used)
}

export default findUnusedFunctions
