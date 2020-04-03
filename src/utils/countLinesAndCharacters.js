import { last, split } from 'ramda'

const countLinesAndCharacters = (string) => {
  const lines = split(/\r\n|\r|\n/, string)
  const lineCount = lines.length
  const lastLineCharacterCount = last(lines).length
  return {
    lastLineCharacterCount,
    lineCount
  }
}

export default countLinesAndCharacters
