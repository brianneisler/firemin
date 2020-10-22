import { pipe } from 'ramda'

import { NodeTypes } from '../../constants'
import createEntry from '../pipes/createEntry'
import expectColonOperator from '../pipes/expectColonOperator'
import identifyKey from '../pipes/identifyKey'
import identifyValue from '../pipes/identifyValue'
import parseColonOperator from '../pipes/parseColonOperator'
import parseKey from '../pipes/parseKey'
import parseValue from '../pipes/parseValue'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseEntryTokens = pipe(
  parseKey,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseValue,
  createEntry
)

const identifyEntryChildren = pipe(
  identifyKey,
  skipWhitespaceAndComments,
  expectColonOperator,
  skipWhitespaceAndComments,
  identifyValue
)

const Entry = {
  identify: (context, node) =>
    createEntry({
      ...identifyEntryChildren({
        ...node,
        context
      }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.ENTRY,
  parse: (context, tokenList) =>
    parseEntryTokens({ children: [], context, tokenList }),
  test: () => false
}

export default Entry
