import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import generateFile from '../generator/generateFile'
import generateString from '../generator/generateString'
import minimizeTokenList from './minimizeTokenList'
import parseFile from '../parser/parseFile'

const minimize = async (context, { filePath, outputFilePath }) => {
  filePath = resolve(filePath)
  if (!(await pathExists(filePath))) {
    throw new Error(`rules file '${filePath}' does not exist`)
  }

  // const ast = await parseFile(context, { filePath })
  // const minimizedAST = await minimizeAST(context, { ast })
  // await generateFile(context, {
  //   ast: minimizedAST
  // })

  // NOTE BRN: This is temporary until we support a full AST instead of just tokens
  const tokenList = await parseFile(context, { filePath })
  const minimizedTokenList = minimizeTokenList(context, { tokenList })

  // let log = '['
  // minimizedTokenList.forEach((listToken) => {
  //   log += `  ${listToken.type},\n`
  // })
  // log += ']'
  // console.log(log)
  if (outputFilePath) {
    outputFilePath = resolve(outputFilePath)
    return await generateFile(context, {
      outputFilePath,
      tokenList: minimizedTokenList
    })
  }
  return generateString(context, { tokenList: minimizedTokenList })
}

export default minimize
