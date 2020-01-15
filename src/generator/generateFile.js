import { createWriteStream, ensureFile } from 'fs-extra'
import tokenToString from '../token/tokenToString'

const generateFile = async (context, { outputFilePath, tokenList }) => {
  await ensureFile(outputFilePath)
  const fileStream = createWriteStream(outputFilePath)
  tokenList.forEach((token) => {
    fileStream.write(tokenToString(token))
  })
  fileStream.end()
  return new Promise((resolve, reject) => {
    fileStream.on('end', resolve)
    fileStream.on('error', reject)
  })
}

export default generateFile
