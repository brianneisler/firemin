import tokenizeFile from './tokenizeFile'
import tokenizeString from './tokenizeString'

const tokenize = async (context, { filePath, string }) => {
  if (filePath) {
    return tokenizeFile(context, filePath)
  }
  return tokenizeString(context, string)
}

export default tokenize
