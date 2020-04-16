import parseFile from './parseFile'
import parseString from './parseString'

const parse = async (context, { filePath, string }) => {
  if (filePath) {
    return parseFile(context, filePath)
  }
  return parseString(context, string)
}

export default parse
