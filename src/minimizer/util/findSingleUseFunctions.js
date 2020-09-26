import countFunctionUses from './countFunctionUses'

const findSingleUseFunctions = (context, ast) => {
  const functionUseCounts = countFunctionUses(context, ast)
  return functionUseCounts.filter((count) => count === 1)
}

export default findSingleUseFunctions
