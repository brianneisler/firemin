import stringToStream from 'string-to-stream'

import tokenizeStream from './tokenizeStream'

const tokenizeString = async (context, string) => {
  const stream = stringToStream(string)
  return await tokenizeStream(context, { stream })
}

export default tokenizeString
