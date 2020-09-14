import { resolve } from 'path'

import generateFile from '../generator/generateFile'
import generateString from '../generator/generateString'
import generateTokenList from '../generator/generateTokenList'
import parseFile from '../parser/parseFile'

import minimizeAST from './minimizeAST'
import minimizeTokenList from './minimizeTokenList'

/**
 * Minimizes the rules contained at the given filePath.
 * If given an outputFilePath this method will output the result to the given
 * file path instead of returning a minimize string.
 *
 * @function
 * @since v0.1.0
 * @category minimizer
 * @param {Context} context
 * @param {{
 *   filePath: String,
 *   outputFilePath: String
 * }}} options
 * @returns {String | Null}
 * @example
 * const context = setupContext()
 *
 * // minimze into a string
 * const minimizedStringRules = await minimize(context, {
 *   filePath: './path/to/firestore.rules'
 * })
 *
 * // minimize and send output to a file
 * await minimize(context, {
 *   filePath: './path/to/firestore.rules',
 *   outputFilePath: './path/to/firestore.min.rules'
 * })
 */
const minimize = async (context, { filePath, outputFilePath }) => {
  const ast = await parseFile(context, filePath)
  const minimizedAST = await minimizeAST(context, ast)
  const minimizedTokenList = minimizeTokenList(
    context,
    generateTokenList(context, { ast: minimizedAST })
  )

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
